import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Heart, Share2, Flag, Eye, MapPin, Shield, Truck, ChevronLeft, ChevronRight, ShoppingCart, MessageCircle, Star, Clock, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuctionStore } from '@/stores/auctionStore'
import { useAuthStore } from '@/stores/authStore'
import CountdownTimer from '@/components/auction/CountdownTimer'
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
    if (id) fetchAuction(id)
  }, [id])

  useEffect(() => {
    if (currentAuction) setBidAmount(calculateMinBid(currentAuction.current_price).toString())
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
    } catch {
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
      <div className="min-h-screen bg-gray-50 pt-20 md:pt-24 py-8">
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
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-24 py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4 md:mb-6 overflow-x-auto">
          <Link to="/" className="hover:text-teal-600 whitespace-nowrap">Home</Link>
          <span>/</span>
          <Link to="/browse" className="hover:text-teal-600 whitespace-nowrap">Browse</Link>
          <span>/</span>
          <span className="text-gray-900 truncate max-w-xs">{currentAuction.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column - Images */}
          <div className="space-y-3 md:space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden border border-gray-200">
              <img src={currentAuction.images[selectedImage]} alt={currentAuction.title} className="w-full h-full object-cover" />
              {isEndingSoon && (
                <div className="absolute top-3 md:top-4 left-3 md:left-4 bg-red-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full font-semibold text-xs md:text-sm flex items-center gap-1 md:gap-2">
                  <Clock className="w-3 md:w-4 h-3 md:h-4" />Ending Soon
                </div>
              )}
              {currentAuction.buy_now_price && (
                <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-orange-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full font-semibold text-xs md:text-sm">Buy Now</div>
              )}
              {currentAuction.images.length > 1 && (
                <>
                  <button onClick={() => setSelectedImage((prev) => (prev - 1 + currentAuction.images.length) % currentAuction.images.length)} className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-8 md:w-10 h-8 md:h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                    <ChevronLeft className="w-4 md:w-5 h-4 md:h-5" />
                  </button>
                  <button onClick={() => setSelectedImage((prev) => (prev + 1) % currentAuction.images.length)} className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-8 md:w-10 h-8 md:h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                    <ChevronRight className="w-4 md:w-5 h-4 md:h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2">
              {currentAuction.images.map((img, idx) => (
                <button key={idx} onClick={() => setSelectedImage(idx)} className={`w-16 md:w-20 h-16 md:h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-colors ${idx === selectedImage ? 'border-teal-500' : 'border-transparent hover:border-gray-300'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button className="flex-1 px-4 md:px-6 py-3 md:py-4 text-sm font-semibold text-teal-600 border-b-2 border-teal-600">Description</button>
                </div>
              </div>
              <div className="p-4 md:p-6">
                <h3 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">About this item</h3>
                <p className="text-gray-600 whitespace-pre-line text-sm md:text-base">{currentAuction.description}</p>

                <div className="mt-4 md:mt-6 grid grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <span className="text-xs md:text-sm text-gray-500">Condition</span>
                    <p className="font-medium text-sm md:text-base">{getConditionLabel(currentAuction.condition)}</p>
                  </div>
                  {currentAuction.location && (
                    <div>
                      <span className="text-xs md:text-sm text-gray-500">Location</span>
                      <p className="font-medium flex items-center gap-1 text-sm md:text-base">
                        <MapPin className="w-3 md:w-4 h-3 md:h-4" />{currentAuction.location}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Bid Info */}
          <div className="space-y-4 md:space-y-6">
            {/* Title & Actions */}
            <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">{currentAuction.title}</h1>

              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="flex items-center gap-2">
                  <img src={currentAuction.seller?.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50'} alt={currentAuction.seller?.username} className="w-8 md:w-10 h-8 md:h-10 rounded-full" />
                  <div>
                    <p className="font-medium text-gray-900 flex items-center gap-1 text-sm md:text-base">
                      {currentAuction.seller?.username}
                      {currentAuction.seller?.verified && <Shield className="w-3 md:w-4 h-3 md:h-4 text-teal-500" />}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500 flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      {currentAuction.seller?.rating || 4.5} ({currentAuction.seller?.review_count || 0} reviews)
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 md:gap-3">
                <button onClick={handleAddToWatchlist} className="flex items-center gap-2 px-3 md:px-4 py-2 border border-gray-300 rounded-xl hover:border-teal-500 hover:text-teal-600 transition-colors text-sm">
                  <Heart className="w-4 md:w-5 h-4 md:h-5" />Watch
                </button>
                <button className="flex items-center gap-2 px-3 md:px-4 py-2 border border-gray-300 rounded-xl hover:border-teal-500 hover:text-teal-600 transition-colors text-sm">
                  <Share2 className="w-4 md:w-5 h-4 md:h-5" />Share
                </button>
                <button className="flex items-center gap-2 px-3 md:px-4 py-2 border border-gray-300 rounded-xl hover:border-red-500 hover:text-red-500 transition-colors text-sm text-gray-500">
                  <Flag className="w-4 md:w-5 h-4 md:h-5" />Report
                </button>
              </div>
            </div>

            {/* Current Bid */}
            <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200">
              <div className="flex items-end justify-between mb-3 md:mb-4">
                <div>
                  <p className="text-sm text-gray-500">Current Bid</p>
                  <p className="text-3xl md:text-4xl font-display font-bold text-teal-600">{formatCurrency(currentAuction.current_price)}</p>
                  <p className="text-sm text-gray-500 mt-1">{currentAuction.bid_count} bids</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Ends in</p>
                  <CountdownTimer endTime={currentAuction.end_time} size="large" showLabel />
                </div>
              </div>

              {isEnded ? (
                <div className="text-center py-4 md:py-6 bg-gray-100 rounded-xl">
                  <AlertCircle className="w-6 md:w-8 h-6 md:h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm md:text-base">This auction has ended</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    {quickBidAmounts.map((amount, idx) => (
                      <button key={idx} onClick={() => setBidAmount(amount.toString())} className="flex-1 py-2 bg-gray-100 hover:bg-teal-50 rounded-lg text-xs md:text-sm font-medium transition-colors">
                        +{formatCurrency(amount - currentAuction.current_price).replace('₱', '')}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                    <div className="flex-1 relative">
                      <span className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm md:text-base">₱</span>
                      <input type="number" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} className="w-full pl-8 md:pl-10 pr-3 md:pr-4 py-2.5 md:py-3 border border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none font-semibold text-base md:text-lg" placeholder="Enter bid amount" />
                    </div>
                    <button onClick={() => setShowBidModal(true)} className="px-6 md:px-8 py-2.5 md:py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors text-sm md:text-base">
                      Place Bid
                    </button>
                  </div>

                  {currentAuction.buy_now_price && (
                    <div className="flex items-center justify-between p-3 md:p-4 bg-orange-50 rounded-xl border border-orange-200">
                      <div>
                        <p className="text-sm text-orange-700">Buy Now Price</p>
                        <p className="text-lg md:text-xl font-display font-bold text-orange-600">{formatCurrency(currentAuction.buy_now_price)}</p>
                      </div>
                      <button className="px-4 md:px-6 py-2 md:py-2.5 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors text-sm md:text-base">Buy Now</button>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-4 md:mt-6 flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />{currentAuction.views} views
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />{currentAuction.watchers_count} watching
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">Seller Information</h3>
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <img src={currentAuction.seller?.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'} alt={currentAuction.seller?.username} className="w-12 md:w-14 h-12 md:h-14 rounded-full" />
                <div>
                  <p className="font-semibold text-gray-900 flex items-center gap-2 text-sm md:text-base">
                    {currentAuction.seller?.username}
                    {currentAuction.seller?.verified && <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs rounded-full">Verified</span>}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500">Member since {formatRelativeTime(currentAuction.seller?.created_at || '')}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link to={`/messages?user=${currentAuction.seller?.id}`} className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-xl hover:border-teal-500 hover:text-teal-600 transition-colors text-sm">
                  <MessageCircle className="w-4 h-4" />Message
                </Link>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors text-sm">
                  <ShoppingCart className="w-4 h-4" />Buy Safely
                </button>
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">Shipping & Returns</h3>
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center gap-2 md:gap-3 text-gray-600 text-sm">
                  <Truck className="w-4 md:w-5 h-4 md:h-5 text-teal-600 flex-shrink-0" />
                  <span>Nationwide shipping available</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-gray-600 text-sm">
                  <Shield className="w-4 md:w-5 h-4 md:h-5 text-teal-600 flex-shrink-0" />
                  <span>Buyer protection guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bid Modal */}
      {showBidModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowBidModal(false)} />
          <div className="relative bg-white rounded-2xl p-6 max-w-md w-full animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Confirm Your Bid</h3>
            <div className="text-center py-4 md:py-6">
              <p className="text-gray-500 mb-2">You are about to bid</p>
              <p className="text-3xl md:text-4xl font-display font-bold text-teal-600">{formatCurrency(parseFloat(bidAmount) || 0)}</p>
              <p className="text-sm text-gray-500 mt-2">on "{currentAuction.title}"</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowBidModal(false)} className="flex-1 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handlePlaceBid} disabled={isBidLoading} className="flex-1 py-3 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-colors disabled:opacity-50">
                {isBidLoading ? 'Placing Bid...' : 'Confirm Bid'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}