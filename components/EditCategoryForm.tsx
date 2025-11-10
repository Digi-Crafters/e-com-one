// components/EditCategoryForm.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { Category } from '@prisma/client'
import { useRouter } from 'next/navigation'

interface EditCategoryFormProps {
  category: Category
}

const EditCategoryForm: React.FC<EditCategoryFormProps> = ({ category }) => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: category.name,
    description: category.description || '',
    slug: category.slug,
    image: category.image || '',
    isActive: category.isActive
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch(`/api/categories/${category.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        router.push('/categories')
        router.refresh()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to update category')
      }
    } catch (error) {
      console.error('Error updating category:', error)
      alert('Failed to update category')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      return
    }

    setIsDeleteLoading(true)
    
    try {
      const response = await fetch(`/api/categories/${category.id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        router.push('/my-categories')
        router.refresh()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to delete category')
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('Failed to delete category')
    } finally {
      setIsDeleteLoading(false)
    }
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Category Name *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={handleNameChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          placeholder="e.g., Electronics, Clothing..."
        />
      </div>

      {/* Slug */}
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
          Slug *
        </label>
        <input
          type="text"
          id="slug"
          required
          value={formData.slug}
          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-gray-50"
          placeholder="e.g., electronics, clothing"
        />
        <p className="mt-1 text-xs text-gray-500">
          URL-friendly version of the name
        </p>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          placeholder="Brief description of the category..."
        />
      </div>

      {/* Image URL */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
          Image URL
        </label>
        <input
          type="url"
          id="image"
          value={formData.image}
          onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          placeholder="https://example.com/image.jpg"
        />
        {formData.image && (
          <div className="mt-2">
            <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
            <div className="w-32 h-32 border border-gray-200 rounded-md overflow-hidden">
              <img
                src={formData.image}
                alt="Category preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Active Status */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="isActive"
          checked={formData.isActive}
          onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
          Active category
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={isLoading || !formData.name || !formData.slug}
          className="flex-1 bg-blue-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? 'Updating...' : 'Update Category'}
        </button>
        
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleteLoading}
          className="flex-1 bg-red-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isDeleteLoading ? 'Deleting...' : 'Delete Category'}
        </button>
      </div>
    </form>
  )
}

export default EditCategoryForm