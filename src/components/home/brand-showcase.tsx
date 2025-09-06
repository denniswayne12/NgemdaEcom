import Link from "next/link"
import Image from "next/image";

const brands = [
  {
    id: "apple",
    name: "Apple", 
    logo: "🍎",
    discount: "UP TO 50% OFF",
    href: "/brands/apple"
  },
  {
    id: "realme",
    name: "realme",
    logo: "/public/images/icons/brands/apple-logo.png",
    discount: "UP TO 80% OFF", 
    href: "/brands/realme"
  },
  {
    id: "poco",
    name: "POCO",
    logo: "⚡",
    discount: "UP TO 60% OFF",
    href: "/brands/poco"
  },
  {
    id: "xiaomi", 
    name: "Mi",
    logo: "📲",
    discount: "UP TO 80% OFF",
    href: "/brands/xiaomi"
  }
]

export function BrandShowcase() {
  return (
    <section className="py-12 px-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Top <span className="text-blue-600">Electronics Brands</span>
        </h2>
        <Link href="/brands" className="text-blue-600 hover:text-blue-700 font-medium">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={brand.href}
            className="group relative overflow-hidden rounded-lg bg-amber-400 to-gray-700 p-6 text-white hover:shadow-xl transition-all duration-300"
          >
            <div className="relative z-10">
              <div className="text-4xl mb-4">{brand.logo}</div>
              <Image src={brand.logo} alt={`${brand.name}} `} width={50} height={50} />
              <h3 className="text-xl font-bold mb-2">{brand.name}</h3>
              <p className="text-sm text-gray-300 mb-4">{brand.discount}</p>
              <div className="inline-flex items-center text-sm font-medium text-blue-400 group-hover:text-blue-300">
                Shop Now →
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        ))}
      </div>
    </section>
  )
}