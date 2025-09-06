"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Filter, X } from "lucide-react"

interface SearchFiltersProps {
  searchParams: {
    q?: string
    category?: string
    brand?: string
    min_price?: string
    max_price?: string
    rating?: string
    sort?: string
    page?: string
  }
}

export function SearchFilters({ searchParams }: SearchFiltersProps) {
  const router = useRouter()
  const currentSearchParams = useSearchParams()
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const categories = [
    "Electronics",
    "Smartphones",
    "Laptops",
    "Tablets",
    "Accessories",
    "Audio",
    "Gaming",
    "Wearables"
  ]

  const brands = [
    "Apple",
    "Samsung",
    "Google",
    "OnePlus",
    "Xiaomi",
    "Sony",
    "LG",
    "Huawei"
  ]

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(currentSearchParams.toString())
    
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    
    // Reset to page 1 when filters change
    params.delete("page")
    
    router.push(`/search?${params.toString()}`)
  }

  const clearAllFilters = () => {
    const params = new URLSearchParams()
    if (searchParams.q) {
      params.set("q", searchParams.q)
    }
    router.push(`/search?${params.toString()}`)
  }

  const hasActiveFilters = Object.keys(searchParams).some(key => 
    key !== "q" && key !== "page" && searchParams[key as keyof typeof searchParams]
  )

  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Desktop filters */}
      <div className="hidden lg:block space-y-6">
        <FilterContent 
          searchParams={searchParams}
          categories={categories}
          brands={brands}
          updateFilter={updateFilter}
          clearAllFilters={clearAllFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      {/* Mobile filters overlay */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Filters</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <FilterContent 
              searchParams={searchParams}
              categories={categories}
              brands={brands}
              updateFilter={updateFilter}
              clearAllFilters={clearAllFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        </div>
      )}
    </>
  )
}

interface FilterContentProps {
  searchParams: {
    q?: string
    category?: string
    brand?: string
    min_price?: string
    max_price?: string
    rating?: string
    sort?: string
    page?: string
  }
  categories: string[]
  brands: string[]
  updateFilter: (key: string, value: string) => void
  clearAllFilters: () => void
  hasActiveFilters: boolean
}

function FilterContent({ 
  searchParams, 
  categories, 
  brands, 
  updateFilter, 
  clearAllFilters, 
  hasActiveFilters 
}: FilterContentProps) {
  return (
    <div className="space-y-6">
      {/* Clear filters */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Clear all filters
        </button>
      )}

      {/* Price range */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={searchParams.min_price || ""}
              onChange={(e) => updateFilter("min_price", e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Max"
              value={searchParams.max_price || ""}
              onChange={(e) => updateFilter("max_price", e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category}
                checked={searchParams.category === category}
                onChange={(e) => updateFilter("category", e.target.checked ? e.target.value : "")}
                className="text-blue-600"
              />
              <span className="text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                value={brand}
                checked={searchParams.brand?.split(",").includes(brand) || false}
                onChange={(e) => {
                  const currentBrands = searchParams.brand?.split(",").filter(Boolean) || []
                  const newBrands = e.target.checked
                    ? [...currentBrands, brand]
                    : currentBrands.filter(b => b !== brand)
                  updateFilter("brand", newBrands.join(","))
                }}
                className="text-blue-600"
              />
              <span className="text-sm text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Customer Rating */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Customer Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={rating.toString()}
                checked={searchParams.rating === rating.toString()}
                onChange={(e) => updateFilter("rating", e.target.checked ? e.target.value : "")}
                className="text-blue-600"
              />
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-sm ${
                        star <= rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-700">& up</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}