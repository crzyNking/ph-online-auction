import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/types'
import { mockUsers, isDemoMode } from '@/lib/supabase'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, username: string, fullName: string) => Promise<void>
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })

        if (isDemoMode) {
          await new Promise(resolve => setTimeout(resolve, 500))
          const mockUser = mockUsers.find(u => u.email === email) || mockUsers[0]
          set({
            user: mockUser as User,
            isAuthenticated: true,
            isLoading: false
          })
          return
        }

        try {
          set({ isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      register: async (email: string, password: string, username: string, fullName: string) => {
        set({ isLoading: true })

        if (isDemoMode) {
          await new Promise(resolve => setTimeout(resolve, 500))
          const newUser: User = {
            id: 'new_' + Date.now(),
            email,
            username,
            full_name: fullName,
            avatar_url: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100`,
            role: 'buyer',
            verified: false,
            created_at: new Date().toISOString(),
          }
          set({
            user: newUser,
            isAuthenticated: true,
            isLoading: false
          })
          return
        }

        try {
          set({ isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      updateProfile: (updates: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null
        }))
      },

      setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user })
      },
    }),
    {
      name: 'ph-auction-auth',
    }
  )
)