import { Link } from 'react-router-dom'
import { Users, Package, DollarSign, TrendingUp, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Users', value: '12,458', icon: Users, change: '+12%', color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Active Auctions', value: '3,241', icon: Package, change: '+8%', color: 'text-teal-600', bg: 'bg-teal-100' },
    { label: 'Total Revenue', value: '₱2.5M', icon: DollarSign, change: '+24%', color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Active Bids', value: '8,921', icon: TrendingUp, change: '+15%', color: 'text-purple-600', bg: 'bg-purple-100' },
  ]

  const recentActivity = [
    { type: 'user', message: 'New seller verified: auto_sales_mnl', time: '5 min ago' },
    { type: 'auction', message: 'New auction pending review: iPhone 15 Pro', time: '15 min ago' },
    { type: 'report', message: 'New report: Fraudulent listing #4521', time: '30 min ago' },
    { type: 'payment', message: 'Payment completed: Order #8921', time: '1 hour ago' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your auction platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">{stat.label}</span>
                <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/admin/users" className="p-4 border border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-colors">
                <Users className="w-6 h-6 text-teal-600 mb-2" />
                <p className="font-medium text-gray-900">User Management</p>
              </Link>
              <Link to="/admin/listings" className="p-4 border border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-colors">
                <Package className="w-6 h-6 text-teal-600 mb-2" />
                <p className="font-medium text-gray-900">Listing Moderation</p>
              </Link>
              <div className="p-4 border border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-colors cursor-pointer">
                <Shield className="w-6 h-6 text-teal-600 mb-2" />
                <p className="font-medium text-gray-900">Verify Sellers</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-colors cursor-pointer">
                <AlertTriangle className="w-6 h-6 text-teal-600 mb-2" />
                <p className="font-medium text-gray-900">Reports</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'report' ? 'bg-red-100 text-red-600' :
                    activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'auction' ? 'bg-teal-100 text-teal-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {activity.type === 'report' ? <AlertTriangle className="w-4 h-4" /> :
                     activity.type === 'user' ? <Users className="w-4 h-4" /> :
                     activity.type === 'auction' ? <Package className="w-4 h-4" /> :
                     <CheckCircle className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}