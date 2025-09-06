"use client"

import { useState } from "react"
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Check } from "lucide-react"
import { formatPrice } from "@/lib/utils"

interface ProductInfoProps {
  product: {
    id: string
    name: string
    description: string
    price: number
    originalPrice?: number
    stockQuantity: number
    rating: number
    reviewCount: number
    features: string[]
    specifications: Record<string, string>
    variations: Array<{
      name: string
      options: string[]
    }>
  }
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedVariations, setSelectedVariations] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleVariationChange = (variationName: string, option: string) => {
    setSelectedVariations(prev => ({
      ...prev,
      [variationName]: option
    }))
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="space-y-6">
      {/* Product title and rating */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
          </div>
          <span className={`text-sm font-medium ${product.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center space-x-3">
        <span className="text-3xl font-bold text-gray-900">
          {formatPrice(product.price)}
        </span>
        {product.originalPrice && (
          <>
            <span className="text-xl text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
              {discount}% OFF
            </span>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed">{product.description}</p>

      {/* Variations */}
      {product.variations.map((variation) => (
        <div key={variation.name}>
          <h3 className="font-medium text-gray-900 mb-3">{variation.name}</h3>
          <div className="flex flex-wrap gap-2">
            {variation.options.map((option) => (
              <button
                key={option}
                onClick={() => handleVariationChange(variation.name, option)}
                className={`px-4 py-2 border rounded-lg transition-colors ${
                  selectedVariations[variation.name] === option
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Quantity */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Quantity</h3>
        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 hover:bg-gray-50 transition-colors"
            >
              -
            </button>
            <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
              className="px-3 py-2 hover:bg-gray-50 transition-colors"
            >
              +
            </button>
          </div>
          <span className="text-sm text-gray-600">
            {product.stockQuantity} available
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex space-x-4">
        <button 
          disabled={product.stockQuantity === 0}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Add to Cart</span>
        </button>
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`p-3 border rounded-lg transition-colors ${
            isWishlisted 
              ? 'border-red-500 bg-red-50 text-red-600' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Features */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Key Features</h3>
        <ul className="space-y-2">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Shipping info */}
      <div className="border-t pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <Truck className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">Free Shipping</p>
              <p className="text-sm text-gray-600">On orders over $50</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <RotateCcw className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">Easy Returns</p>
              <p className="text-sm text-gray-600">30-day return policy</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Shield className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">Warranty</p>
              <p className="text-sm text-gray-600">1-year manufacturer warranty</p>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="border-t pt-6">
        <h3 className="font-medium text-gray-900 mb-4">Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div key={key} className="flex justify-between py-2 border-b border-gray-100">
              <span className="font-medium text-gray-700">{key}</span>
              <span className="text-gray-600">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}