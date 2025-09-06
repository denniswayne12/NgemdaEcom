import Link from "next/link"
import { Star } from "lucide-react"
import { formatPrice } from "@/lib/utils"

const dailyEssentials = [
  {
    id: "1",
    name: "Daily Essentials",
    price: 50.00,
    originalPrice: 70.00,
    rating: 4.2,
    reviews: 56,
    image: "🥗",
    discount: 29
  },
  {
    id: "2", 
    name: "Vegetables",
    price: 10.30,
    originalPrice: 15.00,
    rating: 4.5,
    reviews: 89,
    image: "🥬",
    discount: 31
  },
  {
    id: "3",
    name: "Strawberry",
    price: 25.48,
    originalPrice: 35.00,
    rating: 4.8,
    reviews: 123,
    image: "🍓",
    discount: 27
  },
  {
    id: "4",
    name: "Mango",
    price: 10.25,
    originalPrice: 15.00,
    rating: 4.6,
    reviews: 67,
    image: "🥭",
    discount: 32
  },
  {
    id: "5",
    name: "Cherry",
    price: 12.48,
    originalPrice: 18.00,
    rating: 4.4,
    reviews: 45,
    image: "🍒",
    discount: 31
  },
  {
    id: "6",
    name: "Grapes",
    price: 8.48,
    originalPrice: 12.00,
    rating: 4.3,
    reviews: 78,
    image: "🍇",
    discount: 29
  }
]

export function DailyEssentials() {
  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Daily <span className="text-blue-600">Essentials</span>
        </h2>
        <Link href="/categories/daily-essentials" className="text-blue-600 hover:text-blue-700 font-medium">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {dailyEssentials.map((product) => (
          <div key={product.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow group">
            <div className="p-4">
              <div className="aspect-square bg-gray-50 rounded-lg mb-4 flex items-center justify-center text-6xl">
                {product.image}
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                </div>
                
                <span className="text-sm text-green-600 font-medium">
                  {product.discount}% OFF
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}