import { Star } from "lucide-react"

const mockReviews = [
  {
    id: "1",
    userName: "John D.",
    rating: 5,
    date: "2024-01-15",
    title: "Excellent product!",
    comment: "This product exceeded my expectations. The quality is outstanding and it arrived quickly. Highly recommended!",
    verified: true
  },
  {
    id: "2", 
    userName: "Sarah M.",
    rating: 4,
    date: "2024-01-10",
    title: "Great value for money",
    comment: "Really happy with this purchase. Good quality and the price was very competitive. Would buy again.",
    verified: true
  },
  {
    id: "3",
    userName: "Mike R.",
    rating: 5,
    date: "2024-01-08",
    title: "Perfect!",
    comment: "Exactly what I was looking for. Fast shipping and excellent customer service.",
    verified: false
  }
]

interface ProductReviewsProps {
  productId: string
  rating: number
  reviewCount: number
}

export function ProductReviews({ productId, rating, reviewCount }: ProductReviewsProps) {
  const ratingDistribution = [
    { stars: 5, count: 150, percentage: 61 },
    { stars: 4, count: 63, percentage: 26 },
    { stars: 3, count: 20, percentage: 8 },
    { stars: 2, count: 7, percentage: 3 },
    { stars: 1, count: 5, percentage: 2 }
  ]

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
      
      {/* Rating summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">{rating}</div>
          <div className="flex items-center justify-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-6 w-6 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <p className="text-gray-600">{reviewCount} reviews</p>
        </div>
        
        <div className="space-y-2">
          {ratingDistribution.map((item) => (
            <div key={item.stars} className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 w-8">{item.stars}★</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full" 
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-8">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Write a review button */}
      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
        Write a Review
      </button>

      {/* Reviews list */}
      <div className="space-y-6">
        {mockReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-900">{review.userName}</span>
                  {review.verified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{review.date}</span>
                </div>
              </div>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Load more button */}
      <div className="text-center">
        <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
          Load More Reviews
        </button>
      </div>
    </div>
  )
}