import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Menu, X, User, LogOut, Heart, ShoppingBag, Settings, ChevronDown, Package } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import clsx from 'clsx'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const profileRef = useRef<HTMLDivElement>(null)

  const { user, isAuthenticated, logout } = useAuthStore()

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  const handleLogout = () => {
    logout()
    setIsProfileOpen(false)
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">₱</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              PH Online <span className="text-teal-600">Auction</span>
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4 lg:mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search auctions..."
                className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </form>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-4">
            <Link to="/" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/browse" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">
              Browse
            </Link>
            <Link to="/categories" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">
              Categories
            </Link>
            <Link to="/how-it-works" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">
              How It Works
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 text-gray-600 hover:text-teal-600"
                >
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                    {user?.avatar_url ? (
                      <img src={user.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <User className="w-4 h-4 text-teal-600" />
                    )}
                  </div>
                  <span className="font-medium">{user?.username}</span>
                  <ChevronDown className={clsx("w-4 h-4 transition-transform", isProfileOpen && "rotate-180")} />
                </button>

                {isProfileOpen && (
                  <div ref={profileRef} className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 animate-fade-in z-50">
                    <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50">
                      <ShoppingBag className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <Link to="/dashboard/create-auction" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50">
                      <Package className="w-4 h-4" />
                      Sell Item
                    </Link>
                    <Link to="/dashboard/watchlist" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50">
                      <Heart className="w-4 h-4" />
                      Watchlist
                    </Link>
                    <Link to="/dashboard/settings" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50">
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <hr className="my-2 border-gray-200" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="px-4 py-2 text-gray-700 font-medium hover:text-teal-600">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search auctions..."
              className="w-full pl-12 pr-4 py-2.5 bg-gray-100 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </form>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 py-4 animate-fade-in">
          <nav className="flex flex-col px-4 gap-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-gray-700 font-medium py-2 hover:text-teal-600">
              Home
            </Link>
            <Link to="/browse" onClick={() => setIsMenuOpen(false)} className="text-gray-700 font-medium py-2 hover:text-teal-600">
              Browse
            </Link>
            <Link to="/categories" onClick={() => setIsMenuOpen(false)} className="text-gray-700 font-medium py-2 hover:text-teal-600">
              Categories
            </Link>
            <Link to="/how-it-works" onClick={() => setIsMenuOpen(false)} className="text-gray-700 font-medium py-2 hover:text-teal-600">
              How It Works
            </Link>
            <hr className="border-gray-200" />
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-gray-700 font-medium py-2 hover:text-teal-600">
                  Dashboard
                </Link>
                <Link to="/dashboard/create-auction" onClick={() => setIsMenuOpen(false)} className="text-gray-700 font-medium py-2 hover:text-teal-600">
                  Sell an Item
                </Link>
                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-red-600 font-medium py-2 text-left">
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Link to="/login" className="px-4 py-2 text-center border border-gray-300 rounded-lg font-medium">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 text-center bg-teal-600 text-white font-medium rounded-lg">
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}