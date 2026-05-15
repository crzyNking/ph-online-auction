import { useState, useEffect } from 'react'
import { Bell, Gavel, MessageCircle, AlertCircle, Check, CheckCheck } from 'lucide-react'
import { useNotificationStore } from '@/stores/notificationStore'
import clsx from 'clsx'

export default function Notifications() {
  const { notifications, unreadCount, fetchNotifications, markAsRead, markAllAsRead } = useNotificationStore()
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.read_at)
    : notifications

  const getIcon = (type: string) => {
    switch (type) {
      case 'new_bid':
      case 'outbid':
        return Gavel
      case 'new_message':
        return MessageCircle
      case 'system':
        return AlertCircle
      default:
        return Bell
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-24 py-6 md:py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 text-sm md:text-base">{unreadCount} unread notifications</p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-3 md:px-4 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors text-sm"
            >
              <CheckCheck className="w-4 h-4" />
              Mark all as read
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4 md:mb-6 overflow-x-auto">
          {(['all', 'unread'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={clsx(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap',
                filter === f
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-teal-500'
              )}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-3 md:space-y-4">
          {filteredNotifications.map((notification) => {
            const Icon = getIcon(notification.type)
            const isUnread = !notification.read_at

            return (
              <div
                key={notification.id}
                onClick={() => isUnread && markAsRead(notification.id)}
                className={clsx(
                  'bg-white rounded-xl border p-3 md:p-4 cursor-pointer transition-colors',
                  isUnread ? 'border-teal-200 shadow-sm' : 'border-gray-200',
                  'hover:border-teal-300'
                )}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className={clsx(
                    'w-9 md:w-10 h-9 md:h-10 rounded-full flex items-center justify-center flex-shrink-0',
                    notification.type === 'outbid' ? 'bg-red-100 text-red-600' :
                    notification.type === 'new_bid' ? 'bg-teal-100 text-teal-600' :
                    'bg-gray-100 text-gray-600'
                  )}>
                    <Icon className="w-4 md:w-5 h-4 md:h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900 text-sm md:text-base">{notification.title}</p>
                      {isUnread && (
                        <span className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-gray-600 mt-1 text-sm">{notification.body}</p>
                    <p className="text-xs md:text-sm text-gray-400 mt-2">
                      {new Date(notification.created_at).toLocaleString()}
                    </p>
                  </div>
                  {!isUnread && (
                    <Check className="w-4 h-4 text-gray-300 flex-shrink-0" />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12 md:py-16">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-500 text-sm md:text-base">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  )
}