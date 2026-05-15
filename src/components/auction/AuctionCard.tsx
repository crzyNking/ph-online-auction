import { Link } from 'react-router-dom'
import { Heart, Eye, Clock, MapPin } from 'lucide-react'
import { Auction } from '@/types'
import { formatCurrency, formatRelativeTime } from '@/lib/utils'
import CountdownTimer from './CountdownTimer'

interface AuctionCardProps {
  auction: Auction
  variant?: 'default' | 'compact' | 'horizontal'
}

export default function AuctionCard({ auction, variant = 'default' }: AuctionCardProps) {
  const isEndingSoon = new Date(auction.end_time).getTime() - Date.now() < 3600000

  if (variant === 'horizontal') {
    return (
      <Link to={`/auction/${auction.id}`} className="flex gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all group">
        <div className="w-20 md:w-24 h-20 md:h-24 flex-shrink-0 rounded-lg overflow-hidden">
          <img src={auction.images[0]} alt={auction.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate text-sm md:text-base group-hover:text-teal-600 transition-colors">{auction.title}</h3>
          <p className="text-gray-500 text-xs md:text-sm mt-1">Condition: {auction.condition}</p>
          <div className="flex items-center justify-between mt-2">
            <div>
              <p className="text-xs text-gray-500">Current Bid</p>
              <p className="font-display font-bold text-teal-600 text-sm md:text-base">{formatCurrency(auction.current_price)}</p>
            </div>
            <CountdownTimer endTime={auction.end_time} size="small" />
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link to={`/auction/${auction.id}`} className="block bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-teal-300 hover:shadow-lg transition-all group">
        <div className="aspect-square relative overflow-hidden">
          <img src={auction.images[0]} alt={auction.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
          {auction.buy_now_price && (
            <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">BUY NOW</span>
          )}
          {isEndingSoon && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
              <Clock className="w-3 h-3" />Ending Soon
            </span>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-medium text-gray-900 truncate text-sm">{auction.title}</h3>
          <p className="font-display font-bold text-teal-600 mt-2 text-sm md:text-base">{formatCurrency(auction.current_price)}</p>
          <p className="text-xs text-gray-500 mt-1">{auction.bid_count} bids</p>
        </div>
      </Link>
    )
  }

  // Default variant
  return (
    <Link to={`/auction/${auction.id}`} className="block bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-teal-300 hover:shadow-xl transition-all group">
      <div className="aspect-[4/3] relative overflow-hidden">
        <img src={auction.images[0]} alt={auction.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        {auction.buy_now_price && (
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">Buy Now</span>
        )}
        {isEndingSoon && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" />Ending Soon
          </span>
        )}
        <button className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-teal-50 transition-colors group-hover:scale-110" onClick={(e) => e.preventDefault()}>
          <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm md:text-base group-hover:text-teal-600 transition-colors">{auction.title}</h3>

        <div className="flex items-center gap-2 mt-2 text-xs md:text-sm text-gray-500">
          {auction.location && (
            <>
              <MapPin className="w-4 h-4" />
              <span className="truncate">{auction.location}</span>
            </>
          )}
        </div>

        <div className="flex items-end justify-between mt-4">
          <div>
            <p className="text-xs text-gray-500">Current Bid</p>
            <p className="font-display text-xl md:text-2xl font-bold text-teal-600">{formatCurrency(auction.current_price)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">{auction.bid_count} bids</p>
            <div className="mt-1">
              <CountdownTimer endTime={auction.end_time} size="small" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4 mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <img src={auction.seller?.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50'} alt={auction.seller?.username} className="w-5 md:w-6 h-5 md:h-6 rounded-full" />
            <span className="text-xs md:text-sm text-gray-600">{auction.seller?.username}</span>
            {auction.seller?.verified && (
              <span className="w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-xs md:text-sm">
            <Eye className="w-4 h-4" />
            <span>{auction.views}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}