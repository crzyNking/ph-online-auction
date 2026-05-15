import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle, Edit, Pause, Play, Trash2, Eye, Clock } from 'lucide-react'
import { useAuctionStore } from '@/stores/auctionStore'
import { formatCurrency, formatRelativeTime } from '@/lib/utils'

export default function MyAuctions() {
  const { auctions } = useAuctionStore()
  const [filter, setFilter] = useState('all')

  const myAuctions = auctions.slice(0, 5) // Demo data

  const filteredAuctions = filter === 'all'
    ? myAuctions
    : myAuctions.filter(a => a.status === filter)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Auctions</h1>
            <p className="text-gray-600">Manage your listed items</p>
          </div>
          <Link
            to="/dashboard/create-auction"
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            New Auction
          </Link>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['all', 'active', 'ended', 'sold'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Item</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Current Bid</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Bids</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Ends</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAuctions.map((auction) => (
                <tr key={auction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={auction.images[0]}
                        alt={auction.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <Link to={`/auction/${auction.id}`} className="font-medium text-gray-900 hover:text-teal-600">
                          {auction.title}
                        </Link>
                        <p className="text-sm text-gray-500">{auction.condition}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-display font-semibold text-gray-900">
                    {formatCurrency(auction.current_price)}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{auction.bid_count}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      {formatRelativeTime(auction.end_time)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      auction.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : auction.status === 'ended'
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {auction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-teal-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-teal-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-orange-600 transition-colors">
                        <Pause className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAuctions.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">No auctions found</p>
            <Link
              to="/dashboard/create-auction"
              className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              <PlusCircle className="w-4 h-4" />
              Create your first auction
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}