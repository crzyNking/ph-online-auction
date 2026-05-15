import { Link } from 'react-router-dom'
import { Heart, Trash2, Bell } from 'lucide-react'
import { useAuctionStore } from '@/stores/auctionStore'
import { formatCurrency } from '@/lib/utils'
import CountdownTimer from '@/components/auction/CountdownTimer'

export default function Watchlist() {
  const { watchlist, removeFromWatchlist } = useAuctionStore()

  const handleRemove = async (id: string) => {
    await removeFromWatchlist(id)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-24 py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Watchlist</h1>
          <p className="text-gray-600 text-sm md:text-base">Items you're watching</p>
        </div>

        {watchlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {watchlist.map((auction) => (
              <div key={auction.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <Link to={`/auction/${auction.id}`}>
                  <div className="aspect-[4/3] relative">
                    <img
                      src={auction.images[0]}
                      alt={auction.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <div className="p-3 md:p-4">
                  <Link
                    to={`/auction/${auction.id}`}
                    className="font-semibold text-gray-900 hover:text-teal-600 line-clamp-2 text-sm md:text-base"
                  >
                    {auction.title}
                  </Link>
                  <div className="flex items-center justify-between mt-2 md:mt-3">
                    <div>
                      <p className="text-xs md:text-sm text-gray-500">Current Bid</p>
                      <p className="font-display font-bold text-teal-600 text-sm md:text-base">
                        {formatCurrency(auction.current_price)}
                      </p>
                    </div>
                    <CountdownTimer endTime={auction.end_time} size="small" />
                  </div>
                  <button
                    onClick={() => handleRemove(auction.id)}
                    className="flex items-center gap-2 mt-3 md:mt-4 text-xs md:text-sm text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3 md:w-4 h-3 md:h-4" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 md:py-16">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your watchlist is empty</h3>
            <p className="text-gray-500 mb-4 text-sm md:text-base">Save items you're interested in to track them here</p>
            <Link
              to="/browse"
              className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm md:text-base"
            >
              Browse Auctions
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}