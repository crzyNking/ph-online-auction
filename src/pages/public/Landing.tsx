import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ArrowRight, Shield, Truck, Star, Clock, CreditCard, Users, ChevronLeft, ChevronRight, Sparkles, TrendingUp } from 'lucide-react'
import { useAuctionStore } from '@/stores/auctionStore'
import AuctionCard from '@/components/auction/AuctionCard'
import CountdownTimer from '@/components/auction/CountdownTimer'
import { formatCurrency } from '@/lib/utils'

export default function Landing() {
  const navigate = useNavigate()
  const { featuredAuctions, categories, fetchFeaturedAuctions, fetchCategories } = useAuctionStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    fetchFeaturedAuctions()
    fetchCategories()
  }, [fetchFeaturedAuctions, fetchCategories])

  useEffect(() => {
    if (isPaused || featuredAuctions.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredAuctions.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused, featuredAuctions.length])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const features = [
    { icon: Clock, title: 'Live Bidding', description: 'Real-time auctions with instant updates' },
    { icon: Shield, title: 'Secure Payments', description: 'Multiple payment methods with buyer protection' },
    { icon: Users, title: 'Verified Sellers', description: 'Trusted sellers with verified badges' },
    { icon: Truck, title: 'Nationwide Shipping', description: 'Delivery across the Philippines' },
    { icon: CreditCard, title: 'Buyer Protection', description: 'Full refund guarantee on eligible items' },
    { icon: TrendingUp, title: 'Real-time Alerts', description: 'Never miss a bid with instant notifications' },
  ]

  const howItWorks = [
    { step: 1, title: 'Create an Account', description: 'Sign up for free and verify your identity' },
    { step: 2, title: 'Find Your Item', description: 'Browse auctions or search for specific items' },
    { step: 3, title: 'Place Your Bid', description: 'Bid in real-time and track your auctions' },
    { step: 4, title: 'Win & Pay', description: 'Complete payment and receive your item' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden pt-20 md:pt-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
          <div className="absolute top-40 right-40 w-48 h-48 bg-purple-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 px-4 py-2 rounded-full text-sm font-medium mb-4 md:mb-6">
                <Sparkles className="w-4 h-4" />
                Philippines' #1 Auction Platform
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Find Amazing Deals on{' '}
                <span className="text-teal-400">PH Auction</span>
              </h1>
              <p className="mt-4 md:mt-6 text-lg md:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0">
                Buy and sell items through competitive bidding. Secure payments, verified sellers, and nationwide delivery.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="mt-6 md:mt-8 max-w-xl mx-auto lg:mx-0">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for phones, cars, electronics..."
                    className="w-full pl-12 pr-32 py-3 md:py-4 bg-white rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-teal-500/30 text-base md:text-lg"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-teal-600 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-semibold hover:bg-teal-700 transition-colors text-sm md:text-base"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Quick Links */}
              <div className="mt-6 md:mt-8 flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3">
                {categories.slice(0, 4).map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/categories/${cat.slug}`}
                    className="px-3 md:px-4 py-1.5 md:py-2 bg-white/10 text-white rounded-full text-xs md:text-sm hover:bg-white/20 transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="mt-6 md:mt-10 flex flex-wrap justify-center lg:justify-start items-center gap-4 md:gap-6 text-gray-400 text-xs md:text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 md:w-5 h-4 md:h-5 text-teal-400" />
                  <span>Verified Sellers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 md:w-5 h-4 md:h-5 text-teal-400" />
                  <span>Secure Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 md:w-5 h-4 md:h-5 text-teal-400" />
                  <span>Nationwide Shipping</span>
                </div>
              </div>
            </div>

            {/* Right Content - Featured Auctions Slider */}
            <div
              className="relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 md:p-6 border border-white/20">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <h3 className="text-white font-semibold flex items-center gap-2 text-sm md:text-base">
                    <TrendingUp className="w-4 md:w-5 h-4 md:h-5 text-teal-400" />
                    Featured Auctions
                  </h3>
                  <div className="flex gap-1 md:gap-2">
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev - 1 + featuredAuctions.length) % featuredAuctions.length)}
                      className="w-6 md:w-8 h-6 md:h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                      <ChevronLeft className="w-3 md:w-4 h-3 md:h-4" />
                    </button>
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev + 1) % featuredAuctions.length)}
                      className="w-6 md:w-8 h-6 md:h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                      <ChevronRight className="w-3 md:w-4 h-3 md:h-4" />
                    </button>
                  </div>
                </div>

                <div className="overflow-hidden">
                  {featuredAuctions.length > 0 ? (
                    <div
                      className="flex transition-transform duration-500"
                      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                      {featuredAuctions.map((auction) => (
                        <div key={auction.id} className="w-full flex-shrink-0 px-1 md:px-2">
                          <Link
                            to={`/auction/${auction.id}`}
                            className="block bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow"
                          >
                            <div className="aspect-[4/3] relative">
                              <img
                                src={auction.images[0]}
                                alt={auction.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-2 md:top-3 right-2 md:right-3 bg-orange-500 text-white text-xs font-bold px-2 md:px-3 py-1 rounded-full">
                                HOT
                              </div>
                            </div>
                            <div className="p-3 md:p-4">
                              <h4 className="font-semibold text-gray-900 text-sm md:text-base truncate">{auction.title}</h4>
                              <div className="flex items-center justify-between mt-2 md:mt-3">
                                <div>
                                  <p className="text-xs text-gray-500">Current Bid</p>
                                  <p className="font-display text-lg md:text-xl font-bold text-teal-600">
                                    {formatCurrency(auction.current_price)}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-xs text-gray-500">Ends in</p>
                                  <CountdownTimer endTime={auction.end_time} size="small" />
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-48 md:h-64 flex items-center justify-center text-gray-400">
                      Loading featured auctions...
                    </div>
                  )}
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-3 md:mt-4">
                  {featuredAuctions.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        idx === currentSlide ? 'bg-teal-400' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Browse Categories</h2>
            <p className="mt-2 text-gray-600">Find exactly what you're looking for</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4">
            {categories.map((category, idx) => (
              <Link
                key={category.id}
                to={`/categories/${category.slug}`}
                className="group p-4 md:p-6 bg-gray-50 rounded-2xl text-center hover:bg-teal-50 hover:shadow-lg transition-all animate-fade-in"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="w-12 md:w-16 h-12 md:h-16 mx-auto mb-3 md:mb-4 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow text-2xl md:text-3xl">
                  {category.name === 'Electronics' && '📱'}
                  {category.name === 'Vehicles' && '🚗'}
                  {category.name === 'Real Estate' && '🏠'}
                  {category.name === 'Fashion' && '👗'}
                  {category.name === 'Home & Garden' && '🏡'}
                  {category.name === 'Sports' && '⚽'}
                  {category.name === 'Collectibles' && '💎'}
                  {category.name === 'Business' && '💼'}
                </div>
                <h3 className="font-semibold text-gray-900 text-xs md:text-sm group-hover:text-teal-600 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why Choose PH Auction?</h2>
            <p className="mt-2 text-gray-600">Experience the best auction platform in the Philippines</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, idx) => (
              <div
                key={feature.title}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all animate-fade-in group"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="w-12 md:w-14 h-12 md:h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 md:w-7 h-6 md:h-7 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Auctions */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Trending Auctions</h2>
              <p className="mt-1 text-gray-600">Most popular items right now</p>
            </div>
            <Link
              to="/browse"
              className="flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors text-sm md:text-base"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredAuctions.slice(0, 4).map((auction) => (
              <AuctionCard key={auction.id} auction={auction} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-teal-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-2 text-gray-600">Get started in 4 simple steps</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 md:gap-8">
            {howItWorks.map((step, idx) => (
              <div key={step.step} className="text-center relative">
                <div className="w-16 md:w-20 h-16 md:h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg mb-4 md:mb-6">
                  <span className="text-2xl md:text-3xl font-bold text-teal-600">{step.step}</span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm md:text-base">{step.description}</p>
                {idx < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-teal-300 to-orange-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">
            Ready to Start Your Auction Journey?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8">
            Join thousands of Filipino buyers and sellers on PH Online Auction
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link
              to="/register"
              className="px-6 md:px-8 py-3 md:py-4 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors"
            >
              Create Free Account
            </Link>
            <Link
              to="/browse"
              className="px-6 md:px-8 py-3 md:py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              Browse Auctions
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}