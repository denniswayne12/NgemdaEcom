import Link from "next/link"

const categories = [
  {
    id: "mobile",
    name: "Mobile",
    icon: "📱",
    href: "/categories/mobile"
  },
  {
    id: "cosmetics", 
    name: "Cosmetics",
    icon: "💄",
    href: "/categories/cosmetics"
  },
  {
    id: "electronics",
    name: "Electronics", 
    icon: "🔌",
    href: "/categories/electronics"
  },
  {
    id: "furniture",
    name: "Furniture",
    icon: "🪑", 
    href: "/categories/furniture"
  },
  {
    id: "watches",
    name: "Watches",
    icon: "⌚",
    href: "/categories/watches"
  },
  {
    id: "decor",
    name: "Decor",
    icon: "🏺",
    href: "/categories/decor"
  },
  {
    id: "accessories",
    name: "Accessories", 
    icon: "👜",
    href: "/categories/accessories"
  }
]

export function CategoryGrid() {
  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Shop From <span className="text-blue-600">Top Categories</span>
        </h2>
        <Link href="/categories" className="text-blue-600 hover:text-blue-700 font-medium">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className="group flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-200"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
              {category.icon}
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors text-center">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}