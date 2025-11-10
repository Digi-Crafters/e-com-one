// app/categories/[id]/edit/page.tsx
import React from 'react'
import { prisma } from '@/utils/prisma'
import { notFound } from 'next/navigation'
import EditCategoryForm from '@/components/EditCategoryForm'

interface EditCategoryPageProps {
  params: Promise<{
    id: string
  }>
}

const EditCategoryPage = async (props: EditCategoryPageProps) => {
  // Await the params in Next.js 15
  const params = await props.params
  const { id } = params

  if (!id) {
    notFound()
  }

  const category = await prisma.category.findUnique({
    where: {
      id: id
    }
  })

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <a
              href="/categories"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Categories
            </a>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900">Edit Category</h1>
          <p className="mt-2 text-sm text-gray-600">
            Update the category details below
          </p>
        </div>

        {/* Edit Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <EditCategoryForm category={category} />
        </div>
      </div>
    </div>
  )
}

export default EditCategoryPage