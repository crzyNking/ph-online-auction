import { create } from 'zustand'
import { Notification } from '@/types'
import { mockNotifications, isDemoMode } from '@/lib/supabase'

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  isLoading: boolean
  fetchNotifications: () => Promise<void>
  markAsRead: (id: string) => Promise<void>
  markAllAsRead: () => Promise<void>
  addNotification: (notification: Notification) => void
  clearNotifications: () => void
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,

  fetchNotifications: async () => {
    set({ isLoading: true })

    if (isDemoMode) {
      await new Promise(resolve => setTimeout(resolve, 300))
      const notifications = mockNotifications as Notification[]
      set({
        notifications,
        unreadCount: notifications.filter(n => !n.read_at).length,
        isLoading: false
      })
      return
    }

    set({ isLoading: false })
  },

  markAsRead: async (id: string) => {
    if (isDemoMode) {
      const { notifications } = get()
      const updated = notifications.map(n =>
        n.id === id ? { ...n, read_at: new Date().toISOString() } : n
      )
      set({
        notifications: updated,
        unreadCount: updated.filter(n => !n.read_at).length
      })
    }
  },

  markAllAsRead: async () => {
    if (isDemoMode) {
      const { notifications } = get()
      const updated = notifications.map(n => ({
        ...n,
        read_at: n.read_at || new Date().toISOString()
      }))
      set({ notifications: updated, unreadCount: 0 })
    }
  },

  addNotification: (notification: Notification) => {
    set(state => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1
    }))
  },

  clearNotifications: () => {
    set({ notifications: [], unreadCount: 0 })
  },
}))