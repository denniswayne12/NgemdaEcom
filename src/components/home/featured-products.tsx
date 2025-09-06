import Link from "next/link"
import { Star, Heart } from "lucide-react"
import { formatPrice } from "@/lib/utils"

const featuredProducts = [
  {
    id: "1",
    name: "Galaxy S23 FE 5G",
    price: 599.99,
    originalPrice: 699.99,
    rating: 4.5,
    reviews: 128,
    image: "/api/placeholder/300/300",
    badge: "SALE",
    discount: 14
  },
  {
    id: "2", 
    name: "Canon EOS R50 24.2MP",
    price: 679.99,
    originalPrice: 799.99,
    rating: 4.8,
    reviews: 89,
    image: "/api/placeholder/300/300",
    badge: "HOT",
    discount: 15
  },
  {
    id: "3",
    name: "Galaxy S23 FE 5G",
    price: 599.99,
    originalPrice: 699.99,
    rating: 4.5,
    reviews: 128,
    image: "/api/placeholder/300/300",
    badge: "SALE",
    discount: 14
  },
  {
    id: "4",
    name: "Galaxy S23 FE 5G",
    price: 599.99,
    originalPrice: 699.99,
    rating: 4.5,
    reviews: 128,
    image: "/api/placeholder/300/300",
    badge: "NEW",
    discount: 14
  },
  {
    id: "5",
    name: "Galaxy S23 FE 5G",
    price: 599.99,
    originalPrice: 699.99,
    rating: 4.5,
    reviews: 128,
    image: "/api/placeholder/300/300",
    badge: "SALE",
    discount: 14
  }
]

export function FeaturedProducts() {
  return (
    <section className="py-12 px-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-2">
          Grab the best deal on <span className="text-blue-600">Smartphones</span>
        </h2>
        <Link href="/categories/smartphones" className="text-blue-600 hover:text-blue-700 font-medium">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {featuredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow group">
            <div className="relative p-4">
              {product.badge && (
                <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold rounded ${
                  product.badge === 'SALE' ? 'bg-red-500 text-white' :
                  product.badge === 'HOT' ? 'bg-orange-500 text-white' :
                  'bg-green-500 text-white'
                }`}>
                  {product.badge}
                </span>
              )}
              <button className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors">
                <Heart className="h-4 w-4 text-gray-400 hover:text-red-500" />
              </button>
              
              <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="w-24 h-24 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                  Product Image
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                
                {product.discount && (
                  <span className="text-sm text-green-600 font-medium">
                    Save {product.discount}%
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}