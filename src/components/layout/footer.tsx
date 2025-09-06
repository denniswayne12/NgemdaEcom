import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">NgemdaMart</h3>
            <p className="text-blue-100 mb-4">
              Your ultimate shopping destination for electronics, fashion, home goods, and more. 
              Quality products at unbeatable prices.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 hover:text-blue-200 cursor-pointer" />
              <Twitter className="h-6 w-6 hover:text-blue-200 cursor-pointer" />
              <Instagram className="h-6 w-6 hover:text-blue-200 cursor-pointer" />
              <Youtube className="h-6 w-6 hover:text-blue-200 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-blue-100 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-blue-100 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/careers" className="text-blue-100 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="text-blue-100 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/press" className="text-blue-100 hover:text-white transition-colors">Press</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-blue-100 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/shipping" className="text-blue-100 hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-blue-100 hover:text-white transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/size-guide" className="text-blue-100 hover:text-white transition-colors">Size Guide</Link></li>
              <li><Link href="/track-order" className="text-blue-100 hover:text-white transition-colors">Track Your Order</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5" />
                <span className="text-blue-100"> +237 681-96-66-77</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5" />
                <span className="text-blue-100">customersupport@ngemdamart.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5" />
                <span className="text-blue-100">Douala,Cameroon</span>
              </div>
            </div>
            
            {/* App Download */}
            <div className="mt-6">
              <h5 className="font-semibold mb-3">Download Our App</h5>
              <div className="flex space-x-2">
                <img src="/app-store.png" alt="Download on App Store" className="h-10" />
                <img src="/google-play.png" alt="Get it on Google Play" className="h-10" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-blue-500 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-100 text-sm">
            © 2024 NgemdaMart. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-blue-100 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-blue-100 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-blue-100 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}