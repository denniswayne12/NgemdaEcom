"use client"

import { useState } from "react"
import { formatPrice } from "@/lib/utils"
import { Tag, Truck, Shield, CreditCard } from "lucide-react"
import Link from "next/link"

export function CartSummary() {
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)

  // Mock cart totals
  const subtotal = 3199.97
  const shipping = 0
  const tax = 255.99
  const discount = appliedPromo ? 160.00 : 0
  const total = subtotal + shipping + tax - discount

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setAppliedPromo("SAVE10")
      setPromoCode("")
    } else {
      alert("Invalid promo code")
    }
  }

  const removePromoCode = () => {
    setAppliedPromo(null)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

      {/* Promo code */}
      <div className="mb-6">
        <label htmlFor="promo" className="block text-sm font-medium text-black mb-2">
          Promo Code
        </label>
        <div className="flex space-x-2">
          <input type="text" id="promo" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder="Enter code" className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          <button
            onClick={applyPromoCode}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            Apply
          </button>
        </div>
        
        {appliedPromo && (
          <div className="mt-2 flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Tag className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">{appliedPromo} applied</span>
            </div>
            <button
              onClick={removePromoCode}
              className="text-green-600 hover:text-green-800 text-sm font-medium"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Order totals */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal (3 items)</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="text-green-600 font-medium">
            {shipping === 0 ? "Free" : formatPrice(shipping)}
          </span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span>{formatPrice(tax)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Checkout button */}
      <Link
        href="/checkout"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center block mb-4" >
        Proceed to Checkout
      </Link>

      {/* Continue shopping */}
      <Link
        href="/"
        className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center block mb-6"
      >
        Continue Shopping
      </Link>

      {/* Trust badges */}
      <div className="space-y-3 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Truck className="h-4 w-4 text-green-600" />
          <span>Free shipping on orders over $50</span>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="h-4 w-4 text-blue-600" />
          <span>Secure checkout with SSL encryption</span>
        </div>
        <div className="flex items-center space-x-2">
          <CreditCard className="h-4 w-4 text-purple-600" />
          <span>Multiple payment options available</span>
        </div>
      </div>

      {/* Accepted payment methods */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-3">We accept:</p>
        <div className="flex space-x-2">
          <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
            VISA
          </div>
          <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center">
            MC
          </div>
          <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center">
            AMEX
          </div>
          <div className="w-8 h-5 bg-yellow-500 rounded text-white text-xs flex items-center justify-center">
            PP
          </div>
        </div>
      </div>
    </div>
  )
}