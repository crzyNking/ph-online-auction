import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle, Edit, Pause, Play, Trash2, Eye, Clock } from 'lucide-react'
import { useAuctionStore } from '@/stores/auctionStore'
import { formatCurrency, formatRelativeTime } from '@/lib/utils'

export default function MyAuctions() {
  const { auctions } = useAuctionStore()
  const [filter, setFilter] = useState('all')

  const myAuctions = auctions.slice(0, 5)

  const filteredAuctions = filter === 'all'
    ? myAuctions
    : myAuctions.filter(a => a.status === filter)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Active</span>
      case 'ended':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">Ended</span>
      case 'sold':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Sold</span>
      default:
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{status}</span>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Auctions</h1>
            <p className="text-gray-600 text-sm md:text-base">Manage your listed items</p>
          </div>
          <Link
            to="/dashboard/create-auction"
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors text-sm md:text-base"
          >
            <PlusCircle className="w-4 md:w-5 h-4 md:h-5" />
            New Auction
          </Link>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['all', 'active', 'ended', 'sold'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                filter === status
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-teal-500'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Auctions List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {filteredAuctions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                    <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Current Bid</th>
                    <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Bids</th>
                    <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Ends</th>
                    <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAuctions.map((auction) => (
                    <tr key={auction.id} className="hover:bg-gray-50">
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <div className="flex items-center gap-3 md:gap-4">
                          <img
                            src={auction.images[0]}
                            alt={auction.title}
                            className="w-12 md:w-16 h-12 md:h-16 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <Link to={`/auction/${auction.id}`} className="font-medium text-gray-900 hover:text-teal-600 line-clamp-1 text-sm md:text-base">
                              {auction.title}
                            </Link>
                            <p className="text-xs md:text-sm text-gray-500 capitalize">{auction.condition.replace('_', ' ')}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 hidden sm:table-cell">
                        <span className="font-display font-semibold text-gray-900 text-sm md:text-base">{formatCurrency(auction.current_price)}</span>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 hidden md:table-cell">
                        <span className="text-gray-600 text-sm">{auction.bid_count}</span>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <div className="flex items-center gap-1.5 text-xs md:text-sm text-gray-600">
                          <Clock className="w-3 md:w-4 h-3 md:h-4 flex-shrink-0" />
                          <span className="whitespace-nowrap">{formatRelativeTime(auction.end_time)}</span>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        {getStatusBadge(auction.status)}
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <div className="flex items-center gap-1 md:gap-2">
                          <button className="p-1.5 md:p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors" title="View">
                            <Eye className="w-4 md:w-5 h-4 md:h-5" />
                          </button>
                          <button className="p-1.5 md:p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors" title="Edit">
                            <Edit className="w-4 md:w-5 h-4 md:h-5" />
                          </button>
                          <button className="p-1.5 md:p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Pause">
                            <Pause className="w-4 md:w-5 h-4 md:h-5" />
                          </button>
                          <button className="p-1.5 md:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                            <Trash2 className="w-4 md:w-5 h-4 md:h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 md:py-16">
              <div className="w-16 md:w-20 h-16 md:h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <PlusCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No auctions found</h3>
              <p className="text-gray-500 mb-4 text-sm md:text-base">Start listing your items for auction</p>
              <Link
                to="/dashboard/create-auction"
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm md:text-base"
              >
                <PlusCircle className="w-4 h-4" />
                Create your first auction
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}