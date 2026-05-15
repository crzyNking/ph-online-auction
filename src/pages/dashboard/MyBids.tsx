import { Link } from 'react-router-dom'
import { Gavel, Clock, AlertCircle } from 'lucide-react'
import { useAuctionStore } from '@/stores/auctionStore'
import { formatCurrency, formatRelativeTime } from '@/lib/utils'
import CountdownTimer from '@/components/auction/CountdownTimer'

export default function MyBids() {
  const { auctions } = useAuctionStore()

  const mockBids = [
    {
      id: '1',
      auction: auctions[0],
      myBid: 55000,
      isHighest: true,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      auction: auctions[2],
      myBid: 27000,
      isHighest: false,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      auction: auctions[5],
      myBid: 105000,
      isHighest: true,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Bids</h1>
          <p className="text-gray-600">Track your bidding activity</p>
        </div>

        <div className="space-y-4">
          {mockBids.map((bid) => (
            <div key={bid.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden">
                  <img
                    src={bid.auction.images[0]}
                    alt={bid.auction.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link
                        to={`/auction/${bid.auction.id}`}
                        className="text-lg font-semibold text-gray-900 hover:text-teal-600"
                      >
                        {bid.auction.title}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">
                        Bid placed {formatRelativeTime(bid.createdAt)}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      bid.isHighest
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {bid.isHighest ? 'Highest Bidder' : 'Outbid'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 mt-4">
                    <div>
                      <p className="text-sm text-gray-500">Your Bid</p>
                      <p className="font-display font-bold text-gray-900">
                        {formatCurrency(bid.myBid)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Current Price</p>
                      <p className="font-display font-bold text-teal-600">
                        {formatCurrency(bid.auction.current_price)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time Remaining</p>
                      <CountdownTimer endTime={bid.auction.end_time} size="small" />
                    </div>
                  </div>

                  {!bid.isHighest && (
                    <div className="mt-4 flex items-center gap-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">You've been outbid!</span>
                      <button className="ml-2 text-sm font-semibold hover:underline">
                        Place New Bid
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {mockBids.length === 0 && (
          <div className="text-center py-16">
            <Gavel className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No bids yet</h3>
            <p className="text-gray-500 mb-4">Start bidding on auctions to see them here</p>
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