import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Heart, Share2, Flag, Eye, MapPin, Shield, Truck, ChevronLeft, ChevronRight, ShoppingCart, MessageCircle, Star, Clock, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuctionStore } from '@/stores/auctionStore'
import { useAuthStore } from '@/stores/authStore'
import { Auction } from '@/types'
import CountdownTimer from '@/components/auction/CountdownTimer'
import AuctionCard from '@/components/auction/AuctionCard'
import { formatCurrency, formatRelativeTime, calculateMinBid, getConditionLabel } from '@/lib/utils'

export default function AuctionDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentAuction, isLoading, fetchAuction, placeBid, addToWatchlist } = useAuctionStore()
  const { isAuthenticated, user } = useAuthStore()

  const [selectedImage, setSelectedImage] = useState(0)
  const [bidAmount, setBidAmount] = useState('')
  const [showBidModal, setShowBidModal] = useState(false)
  const [isBidLoading, setIsBidLoading] = useState(false)

  useEffect(() => {
    if (id) {
      fetchAuction(id)
    }
  }, [id])

  useEffect(() => {
    if (currentAuction) {
      setBidAmount(calculateMinBid(currentAuction.current_price).toString())
    }
  }, [currentAuction])

  const handlePlaceBid = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    const amount = parseFloat(bidAmount)
    if (isNaN(amount) || amount < calculateMinBid(currentAuction!.current_price)) {
      toast.error('Bid amount is too low')
      return
    }

    setIsBidLoading(true)
    try {
      await placeBid(currentAuction!.id, amount)
      toast.success('Bid placed successfully!')
      setShowBidModal(false)
    } catch (error) {
      toast.error('Failed to place bid')
    } finally {
      setIsBidLoading(false)
    }
  }

  const handleAddToWatchlist = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    await addToWatchlist(currentAuction!.id)
    toast.success('Added to watchlist')
  }

  const quickBidAmounts = currentAuction ? [
    calculateMinBid(currentAuction.current_price),
    Math.round(currentAuction.current_price * 1.1),
    Math.round(currentAuction.current_price * 1.2),
    Math.round(currentAuction.current_price * 1.5),
  ] : []

  if (isLoading || !currentAuction) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="aspect-square skeleton rounded-xl" />
            <div className="space-y-4">
              <div className="h-8 skeleton rounded w-3/4" />
              <div className="h-6 skeleton rounded w-1/2" />
              <div className="h-32 skeleton rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const isEnded = new Date(currentAuction.end_time).getTime() < Date.now()
  const isEndingSoon = new Date(currentAuction.end_time).getTime() - Date.now() < 3600000

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-teal-600">Home</Link>
          <span>/</span>
          <Link to="/browse" className="hover:text-teal-600">Browse</Link>
          <span>/</span>
          <span className="text-gray-900 truncate max-w-xs">{currentAuction.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden border border-gray-200">
              <img
                src={currentAuction.images[selectedImage]}
                alt={currentAuction.title}
                className="w-full h-full object-cover"
              />
              {isEndingSoon && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Ending Soon
                </div>
              )}
              {currentAuction.buy_now_price && (
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full font-semibold">
                  Buy Now
                </div>
              )}
              {/* Navigation Arrows */}
              {currentAuction.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev - 1 + currentAuction.images.length) % currentAuction.images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev + 1) % currentAuction.images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {currentAuction.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-colors ${
                    idx === selectedImage ? 'border-teal-500' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button className="flex-1 px-6 py-4 text-sm font-semibold text-teal-600 border-b-2 border-teal-600">
                    Description
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">About this item</h3>
                <p className="text-gray-600 whitespace-pre-line">{currentAuction.description}</p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Condition</span>
                    <p className="font-medium">{getConditionLabel(currentAuction.condition)}</p>
                  </div>
                  {currentAuction.location && (
                    <div>
                      <span className="text-sm text-gray-500">Location</span>
                      <p className="font-medium flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {currentAuction.location}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Bid Info */}
          <div className="space-y-6">
            {/* Title & Actions */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{currentAuction.title}</h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <img
                    src={currentAuction.seller?.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50'}
                    alt={currentAuction.seller?.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900 flex items-center gap-1">
                      {currentAuction.seller?.username}
                      {currentAuction.seller?.verified && (
                        <Shield className="w-4 h-4 text-teal-500" />
                      )}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400" />
                      {currentAuction.seller?.rating || 4.5} ({currentAuction.seller?.review_count || 0} reviews)
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToWatchlist}
                  className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl hover:border-teal-500 hover:text-teal-600 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  Watch
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl hover:border-teal-500 hover:text-teal-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl hover:border-red-500 hover:text-red-500 transition-colors text-gray-500">
                  <Flag className="w-5 h-5" />
                  Report
                </button>
              </div>
            </div>

            {/* Current Bid */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Current Bid</p>
                  <p className="text-4xl font-display font-bold text-teal-600">
                    {formatCurrency(currentAuction.current_price)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{currentAuction.bid_count} bids</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Ends in</p>
                  <CountdownTimer endTime={currentAuction.end_time} size="large" showLabel />
                </div>
              </div>

              {isEnded ? (
                <div className="text-center py-6 bg-gray-100 rounded-xl">
                  <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">This auction has ended</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Quick Bid Buttons */}
                  <div className="flex gap-2">
                    {quickBidAmounts.map((amount, idx) => (
                      <button
                        key={idx}
                        onClick={() => setBidAmount(amount.toString())}
                        className="flex-1 py-2.5 bg-gray-100 hover:bg-teal-50 rounded-lg text-sm font-medium transition-colors"
                      >
                        +{formatCurrency(amount - currentAuction.current_price).replace('₱', '')}
                      </button>
                    ))}
                  </div>

                  {/* Bid Input */}
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₱</span>
                      <input
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none font-semibold text-lg"
                        placeholder="Enter bid amount"
                      />
                    </div>
                    <button
                      onClick={() => setShowBidModal(true)}
                      className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors"
                    >
                      Place Bid
                    </button>
                  </div>

                  {/* Buy Now */}
                  {currentAuction.buy_now_price && (
                    <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-200">
                      <div>
                        <p className="text-sm text-orange-700">Buy Now Price</p>
                        <p className="text-xl font-display font-bold text-orange-600">
                          {formatCurrency(currentAuction.buy_now_price)}
                        </p>
                      </div>
                      <button className="px-6 py-2.5 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors">
                        Buy Now
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {currentAuction.views} views
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {currentAuction.watchers_count} watching
                </div>
              </div>
            </div>

            {/* Seller Info Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Seller Information</h3>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={currentAuction.seller?.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'}
                  alt={currentAuction.seller?.username}
                  className="w-14 h-14 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    {currentAuction.seller?.username}
                    {currentAuction.seller?.verified && (
                      <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs rounded-full">Verified</span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500">Member since {formatRelativeTime(currentAuction.seller?.created_at || '')}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/messages?user=${currentAuction.seller?.id}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-xl hover:border-teal-500 hover:text-teal-600 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Message
                </Link>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors">
                  <ShoppingCart className="w-4 h-4" />
                  Buy Safely
                </button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Shipping & Returns</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <Truck className="w-5 h-5 text-teal-600" />
                  <span>Nationwide shipping available</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Shield className="w-5 h-5 text-teal-600" />
                  <span>Buyer protection guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Items */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Items</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Placeholder similar items */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="aspect-square bg-gray-100 rounded-lg mb-4" />
                <div className="h-4 bg-gray-100 rounded mb-2" />
                <div className="h-6 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Bid Confirmation Modal */}
      {showBidModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowBidModal(false)} />
          <div className="relative bg-white rounded-2xl p-6 max-w-md w-full animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Confirm Your Bid</h3>
            <div className="text-center py-6">
              <p className="text-gray-500 mb-2">You are about to bid</p>
              <p className="text-4xl font-display font-bold text-teal-600">
                {formatCurrency(parseFloat(bidAmount) || 0)}
              </p>
              <p className="text-sm text-gray-500 mt-2">on "{currentAuction.title}"</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowBidModal(false)}
                className="flex-1 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePlaceBid}
                disabled={isBidLoading}
                className="flex-1 py-3 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                {isBidLoading ? 'Placing Bid...' : 'Confirm Bid'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}