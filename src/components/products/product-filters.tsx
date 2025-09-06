"use client"

import { useState } from "react"
import { Filter, X } from "lucide-react"

const priceRanges = [
  { label: "Under $25", value: "0-25" },
  { label: "$25 - $50", value: "25-50" },
  { label: "$50 - $100", value: "50-100" },
  { label: "$100 - $200", value: "100-200" },
  { label: "Over $200", value: "200+" }
]

const brands = [
  "Apple", "Samsung", "Google", "OnePlus", "Xiaomi", "Realme", "POCO"
]

const ratings = [
  { label: "4 stars & up", value: "4" },
  { label: "3 stars & up", value: "3" },
  { label: "2 stars & up", value: "2" },
  { label: "1 star & up", value: "1" }
]

export function ProductFilters() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({
    price: [] as string[],
    brands: [] as string[],
    rating: ""
  })

  const toggleFilter = (type: keyof typeof selectedFilters, value: string) => {
    if (type === "rating") {
      setSelectedFilters(prev => ({
        ...prev,
        rating: prev.rating === value ? "" : value
      }))
    } else {
      setSelectedFilters(prev => ({
        ...prev,
        [type]: prev[type].includes(value) 
          ? prev[type].filter(item => item !== value)
          : [...prev[type], value]
      }))
    }
  }

  const clearAllFilters = () => {
    setSelectedFilters({
      price: [],
      brands: [],
      rating: ""
    })
  }

  return (
    <>
      {/* Mobile filter button */}
      <button 
        className="lg:hidden flex items-center space-x-2 mb-4 px-4 py-2 border border-gray-300 rounded-lg"
        onClick={() => setIsOpen(true)}
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
      </button>

      {/* Filter sidebar */}
      <div className={`${isOpen ? 'fixed inset-0 z-50 lg:relative lg:inset-auto' : 'hidden lg:block'}`}>
        {/* Mobile overlay */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
        )}
        
        {/* Filter content */}
        <div className={`${isOpen ? 'fixed right-0 top-0 h-full w-80 bg-white lg:relative lg:w-auto' : ''} lg:bg-transparent p-6 lg:p-0 overflow-y-auto`}>
          {/* Mobile header */}
          <div className="lg:hidden flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Clear filters */}
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <button 
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Clear All
              </button>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <label key={range.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedFilters.price.includes(range.value)}
                      onChange={() => toggleFilter("price", range.value)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Brands</h4>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedFilters.brands.includes(brand)}
                      onChange={() => toggleFilter("brands", brand)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Customer Rating */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Customer Rating</h4>
              <div className="space-y-2">
                {ratings.map((rating) => (
                  <label key={rating.value} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="rating"
                      checked={selectedFilters.rating === rating.value}
                      onChange={() => toggleFilter("rating", rating.value)}
                      className="border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{rating.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}