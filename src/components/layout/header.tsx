"use client"
import Link from "next/link"
import { Search, ShoppingCart, CircleUser, Menu, Heart, LogOut, Settings, X } from "lucide-react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { CartItems } from "@/components/cart/cart-items"
import WishlistPage from "@/screens/wishlistScreen"
import { supabase } from "@/lib/supabase/supabaseClient"


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false)
  const [sidebar, setSidebar] = useState<null | "cart" | "wishlist">(null)
  const router = useRouter()
  const accountRef = useRef<HTMLButtonElement>(null)
  // TODO: Replace with Supabase cart count
  const cartCount = 2

  /* const handleLogout = async () => {
    // Log out from Supabase
    await supabase.auth.signOut();

    const res = await fetch("../../api/auth/logout", {
      method: "POST",
    });

    if (res.ok) {
      window.location.href = "../../auth/login";
    } else {
      console.error("Logout failed");
    }
  };
 */

    const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('../auth/login');
  };

  return (
    <header className="bg-white shadow-sm border-b text-black">
      {/* Top bar */}
      <div className="bg-blue-600 text-white text-sm py-2">
        <div className="container mx-auto px-3 flex justify-between items-center">
          <span>🥳🎉Free shipping on orders over 50,000frs!</span>
          <div className="flex items-center space-x-4">
            <span>📞 +237 681-96-66-77</span>
            <span>📧 customersupport@ngemdamart.com</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" aria-label="Home">
            <div className="bg-blue-600 text-white px-3 py-2 rounded-lg font-bold text-xl">
              NgemdaMart
            </div>
          </Link>


          <form className="hidden md:flex flex-1 max-w-2xl mx-8"
              onSubmit={e => {
                e.preventDefault()
              if (searchValue.trim()) router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`)
            }}
            role="search" aria-label="Product search">

            <div className="relative w-full">
              <input type="text" placeholder="Search for products..." value={searchValue} onChange={e => setSearchValue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-all duration-150 focus:shadow-lg"
                aria-label="Search for products" style={{color: 'black'}}/>
              <button type="submit" className="absolute right-0 top-0 h-full px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors active:scale-95 focus:outline-none" aria-label="Submit search">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>

         
          <div className="flex items-center space-x-4 ">
                <button
                  className="hidden md:flex items-center space-x-1 text-gray-600 hover:text-blue-600 text-[.5rem] transition-colors focus:outline-none"
                  aria-label="Wishlist"
                  onClick={() => setSidebar("wishlist")} >
                  <Heart className="h-5 w-5" />
                  <span className="text-sm">Wishlist</span>
                </button>
                <button
                    className="relative flex items-center space-x-1 text-gray-600 hover:text-blue-600 text-[.5rem] transition-colors focus:outline-none"
                    aria-label="Cart"
                    onClick={() => setSidebar("cart")} >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="hidden md:block text-sm">Cart</span>
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                </button>
                {/* Account dropdown */}
                <div className="relative">
                  <button ref={accountRef} className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 text-[.5rem] transition-colors focus:outline-none" aria-haspopup="true" aria-expanded={accountDropdownOpen} onClick={() => setAccountDropdownOpen(v => !v)} >
                    <CircleUser />
                    <span className="hidden md:block text-sm">Account</span>
                  </button>
                  {accountDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10" role="menu" aria-label="Account options">
                        <Link href="../../settings/" className="flex items-center px-4 py-2 hover:bg-gray-100 text-black" role="menuitem" tabIndex={0}>
                          <Settings className="h-4 w-4 mr-2" /> Settings
                        </Link>
                        <button className="flex items-center cursor-pointer w-full px-4 py-2 hover:bg-gray-100 text-black" role="menuitem" tabIndex={0} onMouseDown={handleSignOut} >
                          <LogOut className="h-4 w-4 mr-2" /> Log out
                        </button>
                    </div>
                  )}
                </div>

              

                {/* Mobile menu button */}
                <button
                  className="md:hidden"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
          </div>
        </div>

        {/* Mobile search */}
        <form
          className="md:hidden mt-4"
          onSubmit={e => {
            e.preventDefault()
            if (searchValue.trim()) router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`)
          }} role="search" aria-label="Product search" >

          <div className="relative">
            <input type="text" placeholder="Search for products..." value={searchValue} onChange={e => setSearchValue(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-all duration-150 focus:shadow-lg" aria-label="Search for products" style={{color: 'black'}} />
            <button type="submit" className="absolute right-0 top-0 h-full px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors active:scale-95 focus:outline-none" aria-label="Submit search">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-50 ">
        <div className="container mx-auto px-4">
          <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block`}>
            <ul className="flex flex-col md:flex-row md:space-x-8 py-4 text-[.8rem]">
              <li>
                <Link href="/categories/smartphones" className="block py-2 md:py-0 text-gray-700 hover:text-blue-600 transition-colors">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link href="/categories/electronics" className="block py-2 md:py-0 text-gray-700 hover:text-blue-600 transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/categories/fashion" className="block py-2 md:py-0 text-gray-700 hover:text-blue-600 transition-colors">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/categories/home" className="block py-2 md:py-0 text-gray-700 hover:text-blue-600 transition-colors">
                  Home & Garden
                </Link>
              </li>
              <li>
                <Link href="/categories/sports" className="block py-2 md:py-0 text-gray-700 hover:text-blue-600 transition-colors">
                  Sports
                </Link>
              </li>
              <li>
                <Link href="/categories/books" className="block py-2 md:py-0 text-gray-700 hover:text-blue-600 transition-colors">
                  Books
                </Link>
              </li>
              <li>
                <Link href="/deals" className="block py-2 md:py-0 text-red-600 hover:text-red-700 transition-colors font-medium">
                  Daily Deals
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    {/* Sidebar Drawer for Cart/Wishlist */}
    {sidebar && (
      <div className="fixed inset-0 z-50 flex" aria-modal="true" role="dialog" tabIndex={-1} onClick={e => { if (e.target === e.currentTarget) setSidebar(null) }} >
        <div className="flex-1 bg-[rgb(71, 71, 71)]   transition-opacity duration-300 cursor-pointer" style={{ minWidth: 0 }} onClick={() => setSidebar(null)}/>
        <aside
          className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl p-6 overflow-y-auto transition-transform duration-300"
          style={{ transform: sidebar ? 'translateX(0)' : 'translateX(100%)' }}
          onClick={e => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-red-600 focus:outline-none"
            aria-label="Close sidebar"
            onClick={() => setSidebar(null)}
          >
            <X className="h-6 w-6" />
          </button>
          {sidebar === "cart" ? (
            <>
              <h2 className="text-xl font-bold mb-4">My Cart</h2>
              <CartItems />
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4">My Wishlist</h2>
              <WishlistPage />
            </>
          )}
        </aside>
      </div>
    )}
    </header>
  )
}