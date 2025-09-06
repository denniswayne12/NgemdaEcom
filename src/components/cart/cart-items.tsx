"use client"

import { useState } from "react"
import { Minus, Plus, Trash2, Heart } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"

const mockCartItems = [
  {
    id: "1",
    productId: "1",
    name: "iPhone 15 Pro Max",
    slug: "iphone-15-pro-max",
    price: 1199.99,
    originalPrice: 1299.99,
    quantity: 1,
    image: "/api/placeholder/150/150",
    color: "Natural Titanium",
    storage: "256GB",
    inStock: true
  },
  {
    id: "2",
    productId: "2", 
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    price: 1099.99,
    originalPrice: 1199.99,
    quantity: 2,
    image: "/api/placeholder/150/150",
    color: "Titanium Black",
    storage: "512GB",
    inStock: true
  },
  {
    id: "3",
    productId: "3",
    name: "Google Pixel 8 Pro",
    slug: "google-pixel-8-pro",
    price: 899.99,
    originalPrice: 999.99,
    quantity: 1,
    image: "/api/placeholder/150/150",
    color: "Obsidian",
    storage: "128GB",
    inStock: false
  }
]

export function CartItems() {
  const [cartItems, setCartItems] = useState(mockCartItems)

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(itemId)
      return
    }
    
    setCartItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId))
  }

  const moveToWishlist = (itemId: string) => {
    // In a real app, you would move the item to wishlist
    removeItem(itemId)
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Looks like you havent added anything to your cart yet.</p>
        <Link 
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {cartItems.map((item) => (
        <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            {/* Product image */}
            <Link href={`/products/${item.slug}`}>
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-gray-500 text-xs">Product Image</span>
              </div>
            </Link>

            {/* Product details */}
            <div className="flex-1 min-w-0">
              <Link href={`/products/${item.slug}`}>
                <h3 className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                  {item.name}
                </h3>
              </Link>
              
              <div className="mt-1 text-sm text-gray-600">
                {item.color && <span>Color: {item.color}</span>}
                {item.storage && <span className="ml-4">Storage: {item.storage}</span>}
              </div>

              <div className="mt-2 flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(item.price)}
                </span>
                {item.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(item.originalPrice)}
                  </span>
                )}
              </div>

              {!item.inStock && (
                <div className="mt-2 text-sm text-red-600 font-medium">
                  Out of stock
                </div>
              )}
            </div>

            {/* Quantity and actions */}
            <div className="flex flex-col items-end space-y-3">
              {/* Quantity selector */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-2 hover:bg-gray-50 transition-colors"
                  disabled={!item.inStock}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-2 hover:bg-gray-50 transition-colors"
                  disabled={!item.inStock}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Action buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => moveToWishlist(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Move to wishlist"
                >
                  <Heart className="h-4 w-4" />
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Item total */}
              <div className="text-right">
                <div className="font-bold text-gray-900">
                  {formatPrice(item.price * item.quantity)}
                </div>
                {item.originalPrice && (
                  <div className="text-sm text-gray-500 line-through">
                    {formatPrice(item.originalPrice * item.quantity)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}