import { useState } from 'react'
import { Eye, Check, X, Flag, MoreVertical, Clock } from 'lucide-react'
import { mockAuctions } from '@/lib/supabase'
import { formatCurrency, formatRelativeTime } from '@/lib/utils'

export default function ListingModeration() {
  const [filter, setFilter] = useState('pending')

  const listings = mockAuctions.map((a, i) => ({
    ...a,
    status: i === 0 ? 'pending' : i === 1 ? 'active' : 'reported',
    submittedAt: new Date(Date.now() - i * 2 * 24 * 60 * 60 * 1000).toISOString(),
  }))

  const filteredListings = filter === 'all'
    ? listings
    : listings.filter(l => l.status === filter)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Listing Moderation</h1>
          <p className="text-gray-600">Review and manage auction listings</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['pending', 'active', 'reported', 'all'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-teal-500'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'pending' && (
                <span className="ml-2 px-2 py-0.5 bg-yellow-500 text-white text-xs rounded-full">2</span>
              )}
            </button>
          ))}
        </div>

        {/* Listings */}
        <div className="space-y-4">
          {filteredListings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full md:w-32 h-32 object-cover rounded-xl"
                />

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{listing.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatCurrency(listing.current_price)} • {listing.bid_count} bids
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      listing.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      listing.status === 'active' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {listing.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Submitted {formatRelativeTime(listing.submittedAt)}
                    </span>
                    <span>Seller: {listing.seller?.username}</span>
                    <span>Views: {listing.views}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                      <Check className="w-4 h-4" />
                      Approve
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    {listing.status === 'pending' && (
                      <button className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                        <X className="w-4 h-4" />
                        Reject
                      </button>
                    )}
                    {listing.status === 'reported' && (
                      <button className="flex items-center gap-2 px-4 py-2 border border-yellow-300 text-yellow-700 rounded-lg hover:bg-yellow-50 transition-colors">
                        <Flag className="w-4 h-4" />
                        Review Report
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">No listings found</p>
          </div>
        )}
      </div>
    </div>
  )
}