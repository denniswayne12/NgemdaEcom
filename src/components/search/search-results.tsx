"use client"

import { useState } from "react"
import { createClient } from '@supabase/supabase-js'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from "next/navigation"
import { Grid, List, ChevronDown, Heart, ShoppingCart } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"

interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  brand: string
  category: string
  badge?: string
  inStock: boolean
}
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

interface SearchResultsProps {
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

const mockProducts = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    slug: "iphone-15-pro-max",
    price: 1199.99,
    originalPrice: 1299.99,
    rating: 4.8,
    reviews: 2847,
    image: "/api/placeholder/300/300",
    brand: "Apple",
    category: "Smartphones",
    badge: "Best Seller",
    inStock: true
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    price: 1099.99,
    originalPrice: 1199.99,
    rating: 4.7,
    reviews: 1923,
    image: "/api/placeholder/300/300",
    brand: "Samsung",
    category: "Smartphones",
    badge: "New",
    inStock: true
  },
  {
    id: "3",
    name: "Google Pixel 8 Pro",
    slug: "google-pixel-8-pro",
    price: 899.99,
    originalPrice: 999.99,
    rating: 4.6,
    reviews: 1456,
    image: "/api/placeholder/300/300",
    brand: "Google",
    category: "Smartphones",
    badge: "Sale",
    inStock: true
  },
  {
    id: "4",
    name: "OnePlus 12",
    slug: "oneplus-12",
    price: 799.99,
    originalPrice: 899.99,
    rating: 4.5,
    reviews: 892,
    image: "/api/placeholder/300/300",
    brand: "OnePlus",
    category: "Smartphones",
    badge: "Hot Deal",
    inStock: true
  },
  {
    id: "5",
    name: "MacBook Pro 14-inch",
    slug: "macbook-pro-14",
    price: 1999.99,
    originalPrice: 2199.99,
    rating: 4.9,
    reviews: 3421,
    image: "/api/placeholder/300/300",
    brand: "Apple",
    category: "Laptops",
    badge: "Premium",
    inStock: true
  },
  {
    id: "6",
    name: "Dell XPS 13",
    slug: "dell-xps-13",
    price: 1299.99,
    originalPrice: 1499.99,
    rating: 4.4,
    reviews: 1876,
    image: "/api/placeholder/300/300",
    brand: "Dell",
    category: "Laptops",
    badge: "Popular",
    inStock: false
  }
]

export function SearchResults({ searchParams }: SearchResultsProps) {
  const router = useRouter()
  const currentSearchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      let query = supabase.from('product').select('*')
      if (searchParams.q) {
        query = query.ilike('name', `%${searchParams.q}%`)
      }
      // Add more filters as needed
      const { data, error } = await query
      if (!error && data) setProducts(data)
      setLoading(false)
    }
    fetchProducts()
  }, [searchParams])
  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
    { value: "rating", label: "Customer Rating" },
    { value: "newest", label: "Newest First" }
  ]

  const updateSort = (sortValue: string) => {
    const params = new URLSearchParams(currentSearchParams.toString())
    params.set("sort", sortValue)
    params.delete("page") // Reset to page 1
    router.push(`/search?${params.toString()}`)
  }

  const currentSort = searchParams.sort || "relevance"
  const currentSortLabel = sortOptions.find(option => option.value === currentSort)?.label || "Relevance"

  return (
    <div className="space-y-6">
      {/* Results header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-black">
            Showing {products.length} result{products.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {/* View mode toggle */}
          <div className="flex border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${
                viewMode === "grid" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-600 hover:bg-gray-50"
              } transition-colors`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${
                viewMode === "list" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-600 hover:bg-gray-50"
              } transition-colors`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <select
              value={currentSort}
              onChange={(e) => updateSort(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Products grid/list */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {mockProducts.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 mt-8">
        <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
          Previous
        </button>
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            className={`px-3 py-2 rounded-lg transition-colors ${
              page === 1
                ? "bg-blue-600 text-white"
                : "border border-gray-300 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}
        <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
          Next
        </button>
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
      <div className="relative mb-4">
        <Link href={`/products/${product.slug}`}>
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 text-sm">Product Image</span>
          </div>
        </Link>
        
        {product.badge && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            {product.badge}
          </span>
        )}
        
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
            <span className="text-white font-medium">Out of Stock</span>
          </div>
        )}

        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
          <Heart className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <div className="space-y-2">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center space-x-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-sm ${
                  star <= Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.reviews})</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-sm text-green-600 font-medium">
                {discountPercentage}% off
              </span>
            </>
          )}
        </div>

        <button 
          disabled={!product.inStock}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>{product.inStock ? "Add to Cart" : "Out of Stock"}</span>
        </button>
      </div>
    </div>
  )
}

function ProductListItem({ product }: { product: Product }) {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start space-x-6">
        <div className="relative flex-shrink-0">
          <Link href={`/products/${product.slug}`}>
            <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-sm">Product Image</span>
            </div>
          </Link>
          
          {product.badge && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              {product.badge}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors mb-2">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center space-x-1 mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-sm ${
                    star <= Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
          </div>

          <p className="text-gray-600 text-sm mb-4">
            Brand: {product.brand} • Category: {product.category}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-sm text-green-600 font-medium">
                    {discountPercentage}% off
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Heart className="h-4 w-4 text-gray-600" />
              </button>
              <button 
                disabled={!product.inStock}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>{product.inStock ? "Add to Cart" : "Out of Stock"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}