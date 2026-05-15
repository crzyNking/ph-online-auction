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
    { icon: Clock, title: 'Live Bidding', desc: 'Real-time auctions with instant updates' },
    { icon: Shield, title: 'Secure Payments', desc: 'Multiple payment methods with buyer protection' },
    { icon: Users, title: 'Verified Sellers', desc: 'Trusted sellers with verified badges' },
    { icon: Truck, title: 'Nationwide Shipping', desc: 'Delivery across the Philippines' },
  ]

  const steps = [
    { step: 1, title: 'Create Account', desc: 'Sign up for free and verify your identity' },
    { step: 2, title: 'Find Your Item', desc: 'Browse auctions or search for specific items' },
    { step: 3, title: 'Place Your Bid', desc: 'Bid in real-time and track your auctions' },
    { step: 4, title: 'Win & Pay', desc: 'Complete payment and receive your item' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 md:pt-24 pb-16 md:pb-24 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-16 left-8 w-48 h-48 bg-teal-500 rounded-full blur-3xl" />
          <div className="absolute bottom-24 right-12 w-64 h-64 bg-orange-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Text Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Philippines' #1 Auction Platform
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                Find Amazing Deals on{' '}
                <span className="text-teal-400">PH Auction</span>
              </h1>

              <p className="text-lg text-gray-300 max-w-lg mx-auto lg:mx-0 mb-8">
                Buy and sell items through competitive bidding. Secure payments, verified sellers, and nationwide delivery.
              </p>

              {/* Search */}
              <form onSubmit={handleSearch} className="max-w-xl mx-auto lg:mx-0">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search phones, cars, electronics..."
                      className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors text-sm md:text-base whitespace-nowrap"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Quick categories */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-6">
                {categories.slice(0, 4).map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/categories/${cat.slug}`}
                    className="px-3 py-1.5 bg-white/10 text-white rounded-full text-xs hover:bg-white/20 transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-teal-400" />
                  <span>Verified Sellers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-teal-400" />
                  <span>Secure Payments</span>
                </div>
              </div>
            </div>

            {/* Right - Featured Slider */}
            <div
              className="relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-teal-400" />
                    Featured Auctions
                  </h3>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev - 1 + featuredAuctions.length) % featuredAuctions.length)}
                      className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev + 1) % featuredAuctions.length)}
                      className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl">
                  {featuredAuctions.length > 0 ? (
                    <div
                      className="flex transition-transform duration-500"
                      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                      {featuredAuctions.map((auction) => (
                        <div key={auction.id} className="w-full flex-shrink-0">
                          <Link
                            to={`/auction/${auction.id}`}
                            className="block bg-white rounded-xl overflow-hidden"
                          >
                            <div className="aspect-[4/3] relative">
                              <img
                                src={auction.images[0]}
                                alt={auction.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                HOT
                              </div>
                            </div>
                            <div className="p-4">
                              <h4 className="font-semibold text-gray-900 text-sm truncate">{auction.title}</h4>
                              <div className="flex items-center justify-between mt-3">
                                <div>
                                  <p className="text-xs text-gray-500">Current Bid</p>
                                  <p className="font-bold text-teal-600">{formatCurrency(auction.current_price)}</p>
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
                    <div className="h-64 flex items-center justify-center text-gray-400">
                      Loading...
                    </div>
                  )}
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-4">
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

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Browse Categories</h2>
            <p className="mt-2 text-gray-600">Find exactly what you're looking for</p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((category) => {
              const emojis: Record<string, string> = {
                'Electronics': '📱',
                'Vehicles': '🚗',
                'Real Estate': '🏠',
                'Fashion': '👗',
                'Home & Garden': '🏡',
                'Sports': '⚽',
                'Collectibles': '💎',
                'Business': '💼',
              }
              return (
                <Link
                  key={category.id}
                  to={`/categories/${category.slug}`}
                  className="group flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-teal-50 hover:shadow-md transition-all text-center"
                >
                  <span className="text-2xl mb-2">{emojis[category.name] || '📦'}</span>
                  <span className="text-xs font-medium text-gray-700 group-hover:text-teal-600">{category.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why Choose PH Auction?</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Trending Auctions</h2>
              <p className="mt-1 text-gray-600">Most popular items right now</p>
            </div>
            <Link
              to="/browse"
              className="flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 text-sm"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredAuctions.slice(0, 4).map((auction) => (
              <AuctionCard key={auction.id} auction={auction} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-teal-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-2 text-gray-600">Get started in 4 simple steps</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step) => (
              <div key={step.step} className="text-center relative">
                <div className="w-14 h-14 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {step.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Auction Journey?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join thousands of Filipino buyers and sellers on PH Online Auction
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors"
            >
              Create Free Account
            </Link>
            <Link
              to="/browse"
              className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              Browse Auctions
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}