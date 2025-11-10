// components/CategoryCard.tsx
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Category {
  id: string
  name: string
  description: string | null
  slug: string
  image: string | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

interface CategoryCardProps {
  category: Category
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Category Image */}
      <div className="aspect-w-16 aspect-h-9 bg-gray-100 h-48 relative">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            category.isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {category.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      {/* Category Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {category.name}
          </h3>
        </div>
        
        {category.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {category.description}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
            /{category.slug}
          </span>
          <span>
            {new Date(category.createdAt).toLocaleDateString()}
          </span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
          <Link 
            href={`/categories/${category.id}/edit`}
            className="flex-1 bg-blue-50 text-blue-700 hover:bg-blue-100 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 text-center"
          >
            Edit
          </Link>
          <Link 
            href={`/my-categories/${category.id}`}
            className="flex-1 bg-gray-50 text-gray-700 hover:bg-gray-100 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 text-center"
          >
            View Products
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CategoryCard