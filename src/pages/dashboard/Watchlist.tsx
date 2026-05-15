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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Watchlist</h1>
          <p className="text-gray-600">Items you're watching</p>
        </div>

        {watchlist.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="p-4">
                  <Link
                    to={`/auction/${auction.id}`}
                    className="font-semibold text-gray-900 hover:text-teal-600 line-clamp-2"
                  >
                    {auction.title}
                  </Link>
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <p className="text-sm text-gray-500">Current Bid</p>
                      <p className="font-display font-bold text-teal-600">
                        {formatCurrency(auction.current_price)}
                      </p>
                    </div>
                    <CountdownTimer endTime={auction.end_time} size="small" />
                  </div>
                  <button
                    onClick={() => handleRemove(auction.id)}
                    className="flex items-center gap-2 mt-4 text-sm text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your watchlist is empty</h3>
            <p className="text-gray-500 mb-4">Save items you're interested in to track them here</p>
            <Link
              to="/browse"
              className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Browse Auctions
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}