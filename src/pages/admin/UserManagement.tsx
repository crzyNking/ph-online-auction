import { useState } from 'react'
import { Search, Shield, Ban, CheckCircle, XCircle, MoreVertical } from 'lucide-react'
import { mockUsers } from '@/lib/supabase'

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const users = mockUsers.map((u, i) => ({
    ...u,
    role: i === 0 ? 'buyer' : i === 1 ? 'seller' : 'admin',
    verified: i > 0,
    status: 'active',
    joinDate: new Date(Date.now() - (i + 1) * 30 * 24 * 60 * 60 * 1000).toISOString(),
  }))

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-24 py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 text-sm md:text-base">Manage platform users and permissions</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-4 md:mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users..."
              className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3 bg-white border border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none text-sm"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['all', 'buyers', 'sellers', 'verified', 'banned'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                  filter === f
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-teal-500'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-medium text-gray-500">User</th>
                  <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-medium text-gray-500">Role</th>
                  <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-medium text-gray-500">Joined</th>
                  <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <div className="flex items-center gap-2 md:gap-3">
                        <img
                          src={user.avatar_url}
                          alt={user.username}
                          className="w-8 md:w-10 h-8 md:h-10 rounded-full flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 text-sm">{user.full_name}</p>
                          <p className="text-xs md:text-sm text-gray-500">@{user.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                        user.role === 'seller' ? 'bg-teal-100 text-teal-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <span className="flex items-center gap-1 text-xs md:text-sm text-green-600">
                        <CheckCircle className="w-3 md:w-4 h-3 md:h-4" />
                        Active
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-500">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <div className="flex items-center gap-1 md:gap-2">
                        <button className="p-1.5 md:p-2 text-teal-600 hover:bg-teal-50 rounded-lg" title="Verify">
                          <Shield className="w-3 md:w-4 h-3 md:h-4" />
                        </button>
                        <button className="p-1.5 md:p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Ban">
                          <Ban className="w-3 md:w-4 h-3 md:h-4" />
                        </button>
                        <button className="p-1.5 md:p-2 text-gray-400 hover:text-gray-600">
                          <MoreVertical className="w-3 md:w-4 h-3 md:h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}