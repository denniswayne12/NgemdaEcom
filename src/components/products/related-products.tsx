import Link from "next/link"
import { Star, Heart } from "lucide-react"
import { formatPrice } from "@/lib/utils"

const mockRelatedProducts = [
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    price: 1099.99,
    originalPrice: 1199.99,
    rating: 4.7,
    reviews: 189,
    image: "/api/placeholder/300/300",
    badge: "SALE"
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
    badge: "HOT"
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
    badge: "NEW"
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
    badge: "SALE"
  }
]

interface RelatedProductsProps {
  categoryId: string
  currentProductId: string
}

export function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  // In a real app, you would filter products by category and exclude current product
  const relatedProducts = mockRelatedProducts

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
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
                  <div className="w-24 h-24 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-sm">
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}