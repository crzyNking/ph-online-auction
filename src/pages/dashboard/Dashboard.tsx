import { useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Gavel, Heart, MessageCircle, Bell, ShoppingBag, Package, Settings, PlusCircle, DollarSign, TrendingUp, Users } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useAuctionStore } from '@/stores/auctionStore'
import clsx from 'clsx'

export default function Dashboard() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuthStore()
  const { auctions, watchlist } = useAuctionStore()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated || !user) return null

  const stats = [
    { label: 'Active Bids', value: 5, icon: Gavel, color: 'text-teal-600', bg: 'bg-teal-100' },
    { label: 'Watching', value: watchlist.length, icon: Heart, color: 'text-orange-600', bg: 'bg-orange-100' },
    { label: 'Won Auctions', value: 12, icon: Trophy, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Total Spent', value: '₱125,000', icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-100' },
  ]

  const menuItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Bids', path: '/dashboard/bids', icon: Gavel },
    { name: 'My Auctions', path: '/dashboard/auctions', icon: Package },
    { name: 'Watchlist', path: '/dashboard/watchlist', icon: Heart },
    { name: 'Messages', path: '/dashboard/messages', icon: MessageCircle },
    { name: 'Notifications', path: '/dashboard/notifications', icon: Bell },
    { name: 'Profile', path: '/dashboard/profile', icon: Users },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center">
                  {user.avatar_url ? (
                    <img src={user.avatar_url} alt="" className="w-14 h-14 rounded-full object-cover" />
                  ) : (
                    <Users className="w-7 h-7 text-teal-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user.full_name}</h3>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
              </div>

              <Link
                to="/dashboard/create-auction"
                className="flex items-center justify-center gap-2 w-full py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors mb-6"
              >
                <PlusCircle className="w-5 h-5" />
                Create Auction
              </Link>

              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={clsx(
                        'flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors',
                        isActive
                          ? 'bg-teal-50 text-teal-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">{stat.label}</span>
                    <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                  <p className="text-2xl font-display font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { type: 'bid', message: 'You placed a bid on iPhone 15 Pro Max', time: '2 hours ago' },
                  { type: 'outbid', message: 'You were outbid on Sony PS5', time: '5 hours ago' },
                  { type: 'won', message: 'You won the auction for MacBook Air M2', time: '1 day ago' },
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className={clsx(
                      'w-10 h-10 rounded-full flex items-center justify-center',
                      activity.type === 'bid' && 'bg-teal-100 text-teal-600',
                      activity.type === 'outbid' && 'bg-red-100 text-red-600',
                      activity.type === 'won' && 'bg-green-100 text-green-600',
                    )}>
                      <Gavel className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.message}</p>
                      <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Trophy(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}