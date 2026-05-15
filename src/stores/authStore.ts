import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/types'
import { supabase, mockUsers, isDemoMode } from '@/lib/supabase'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, username: string, fullName: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  loginWithFacebook: () => Promise<void>
  logout: () => Promise<void>
  updateProfile: (updates: Partial<User>) => void
  setUser: (user: User | null) => void
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      checkAuth: async () => {
        if (isDemoMode) return

        set({ isLoading: true })
        try {
          const { data: { session } } = await supabase.auth.getSession()
          if (session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()

            if (profile) {
              set({
                user: {
                  id: profile.id,
                  email: session.user.email || '',
                  username: profile.username,
                  full_name: profile.full_name,
                  avatar_url: profile.avatar_url || '',
                  phone: profile.phone,
                  address: profile.address,
                  role: profile.role || 'buyer',
                  verified: profile.verified || false,
                  rating: profile.rating,
                  review_count: profile.review_count,
                  created_at: profile.created_at,
                },
                isAuthenticated: true,
                isLoading: false
              })
            }
          } else {
            set({ isLoading: false })
          }
        } catch (error) {
          set({ isLoading: false })
        }
      },

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
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          })

          if (error) throw error

          if (data.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', data.user.id)
              .single()

            set({
              user: profile ? {
                id: profile.id,
                email: data.user.email || '',
                username: profile.username,
                full_name: profile.full_name,
                avatar_url: profile.avatar_url || '',
                phone: profile.phone,
                address: profile.address,
                role: profile.role || 'buyer',
                verified: profile.verified || false,
                created_at: profile.created_at,
              } : {
                id: data.user.id,
                email: data.user.email || '',
                username: data.user.email?.split('@')[0] || '',
                full_name: '',
                avatar_url: '',
                role: 'buyer' as const,
                verified: false,
                created_at: new Date().toISOString(),
              },
              isAuthenticated: true,
              isLoading: false
            })
          }
        } catch (error: any) {
          set({ isLoading: false })
          throw new Error(error.message || 'Login failed')
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
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                username,
                full_name: fullName,
              }
            }
          })

          if (error) throw error

          if (data.user) {
            // Create profile
            await supabase.from('profiles').insert({
              id: data.user.id,
              username,
              full_name: fullName,
              role: 'buyer',
            })

            set({
              user: {
                id: data.user.id,
                email: data.user.email || '',
                username,
                full_name: fullName,
                avatar_url: '',
                role: 'buyer',
                verified: false,
                created_at: new Date().toISOString(),
              },
              isAuthenticated: true,
              isLoading: false
            })
          }
        } catch (error: any) {
          set({ isLoading: false })
          throw new Error(error.message || 'Registration failed')
        }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true })

        if (isDemoMode) {
          await new Promise(resolve => setTimeout(resolve, 500))
          const newUser: User = {
            id: 'google_' + Date.now(),
            email: 'google.user@gmail.com',
            username: 'googleuser',
            full_name: 'Google User',
            avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
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
          const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: window.location.origin + '/dashboard',
            }
          })

          if (error) throw error

          // OAuth will redirect, so we don't set loading to false here
        } catch (error: any) {
          set({ isLoading: false })
          throw new Error(error.message || 'Google login failed')
        }
      },

      loginWithFacebook: async () => {
        set({ isLoading: true })

        if (isDemoMode) {
          await new Promise(resolve => setTimeout(resolve, 500))
          const newUser: User = {
            id: 'facebook_' + Date.now(),
            email: 'facebook.user@facebook.com',
            username: 'facebookuser',
            full_name: 'Facebook User',
            avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
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
          const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'facebook',
            options: {
              redirectTo: window.location.origin + '/dashboard',
            }
          })

          if (error) throw error
        } catch (error: any) {
          set({ isLoading: false })
          throw new Error(error.message || 'Facebook login failed')
        }
      },

      logout: async () => {
        if (!isDemoMode) {
          await supabase.auth.signOut()
        }
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