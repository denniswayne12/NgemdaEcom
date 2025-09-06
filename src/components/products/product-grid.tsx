import Link from "next/link"
import { Star, Heart, ShoppingCart } from "lucide-react"
import { formatPrice } from "@/lib/utils"

// Mock data - in a real app, this would come from your database
const mockProducts = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    slug: "iphone-15-pro-max",
    price: 1199.99,
    originalPrice: 1299.99,
    rating: 4.8,
    reviews: 245,
    image: "/api/placeholder/300/300",
    badge: "NEW",
    discount: 8,
    brand: "Apple"
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra", 
    price: 1099.99,
    originalPrice: 1199.99,
    rating: 4.7,
    reviews: 189,
    image: "/api/placeholder/300/300",
    badge: "SALE",
    discount: 8,
    brand: "Samsung"
  },
  {
    id: "3",
    name: "Google Pixel 8 Pro",
    slug: "google-pixel-8-pro",
    price: 899.99,
    originalPrice: 999.99,
    rating: 4.6,
    reviews: 156,
    image: "/api/placeholder/300/300",
    badge: "HOT",
    discount: 10,
    brand: "Google"
  },
  {
    id: "4",
    name: "OnePlus 12",
    slug: "oneplus-12",
    price: 799.99,
    originalPrice: 899.99,
    rating: 4.5,
    reviews: 123,
    image: "/api/placeholder/300/300",
    badge: "SALE",
    discount: 11,
    brand: "OnePlus"
  },
  {
    id: "5",
    name: "Xiaomi 14 Ultra",
    slug: "xiaomi-14-ultra",
    price: 699.99,
    originalPrice: 799.99,
    rating: 4.4,
    reviews: 98,
    image: "/api/placeholder/300/300",
    badge: "NEW",
    discount: 13,
    brand: "Xiaomi"
  },
  {
    id: "6",
    name: "Nothing Phone (2a)",
    slug: "nothing-phone-2a",
    price: 399.99,
    originalPrice: 449.99,
    rating: 4.3,
    reviews: 87,
    image: "/api/placeholder/300/300",
    badge: "HOT",
    discount: 11,
    brand: "Nothing"
  }
]

interface ProductGridProps {
  category?: string
  filters?: {
    sort?: string
    price?: string
    brand?: string
    rating?: string
  }
}

export function ProductGrid({ category, filters }: ProductGridProps) {
  // In a real app, you would filter and sort products based on the filters
  const products = mockProducts

  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-600">
        Showing {products.length} results
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow group">
            <div className="relative p-4">
              {product.badge && (
                <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold rounded z-10 ${
                  product.badge === 'SALE' ? 'bg-red-500 text-white' :
                  product.badge === 'HOT' ? 'bg-orange-500 text-white' :
                  'bg-green-500 text-white'
                }`}>
                  {product.badge}
                </span>
              )}
              
              <button className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors z-10">
                <Heart className="h-4 w-4 text-gray-400 hover:text-red-500" />
              </button>

              <Link href={`/products/${product.slug}`}>
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                  <div className="w-32 h-32 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                    Product Image
                  </div>
                </div>
              </Link>

              <div className="space-y-2">
                <Link href={`/products/${product.slug}`}>
                  <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>

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

                <button className="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center space-x-2">
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Previous
          </button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">1</button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">2</button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">3</button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}