import { formatPrice } from "@/lib/utils"
import { Shield, Truck, RotateCcw } from "lucide-react"

const mockOrderItems = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    color: "Natural Titanium",
    storage: "256GB",
    quantity: 1,
    price: 1199.99,
    image: "/api/placeholder/80/80"
  },
  {
    id: "2", 
    name: "Samsung Galaxy S24 Ultra",
    color: "Titanium Black",
    storage: "512GB",
    quantity: 2,
    price: 1099.99,
    image: "/api/placeholder/80/80"
  },
  {
    id: "3",
    name: "Google Pixel 8 Pro",
    color: "Obsidian",
    storage: "128GB",
    quantity: 1,
    price: 899.99,
    image: "/api/placeholder/80/80"
  }
]

export function OrderSummary() {
  const subtotal = mockOrderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

      {/* Order items */}
      <div className="space-y-4 mb-6">
        {mockOrderItems.map((item) => (
          <div key={item.id} className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-xs">Image</span>
              </div>
              <div className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {item.quantity}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
              <p className="text-xs text-gray-600">
                {item.color} • {item.storage}
              </p>
            </div>
            
            <div className="text-sm font-medium text-gray-900">
              {formatPrice(item.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-3 mb-6 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
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
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Security badges */}
      <div className="space-y-3 text-sm text-gray-600 mb-6">
        <div className="flex items-center space-x-2">
          <Shield className="h-4 w-4 text-green-600" />
          <span>SSL encrypted checkout</span>
        </div>
        <div className="flex items-center space-x-2">
          <Truck className="h-4 w-4 text-blue-600" />
          <span>Free shipping on orders over $50</span>
        </div>
        <div className="flex items-center space-x-2">
          <RotateCcw className="h-4 w-4 text-purple-600" />
          <span>30-day return policy</span>
        </div>
      </div>

      {/* Payment methods */}
      <div className="border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-600 mb-3">Accepted payment methods:</p>
        <div className="flex space-x-2">
          <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
            VISA
          </div>
          <div className="w-10 h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center">
            MC
          </div>
          <div className="w-10 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center">
            AMEX
          </div>
          <div className="w-10 h-6 bg-yellow-500 rounded text-white text-xs flex items-center justify-center">
            PP
          </div>
          <div className="w-10 h-6 bg-gray-800 rounded text-white text-xs flex items-center justify-center">
            GPay
          </div>
        </div>
      </div>

      {/* Terms */}
      <div className="mt-6 text-xs text-gray-500">
        <p>
          By placing your order, you agree to our{" "}
          <a href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  )
}