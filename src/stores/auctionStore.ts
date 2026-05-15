import { create } from 'zustand'
import { Auction, Category, Bid } from '@/types'
import { mockAuctions, mockCategories, isDemoMode } from '@/lib/supabase'

interface AuctionState {
  auctions: Auction[]
  featuredAuctions: Auction[]
  categories: Category[]
  currentAuction: Auction | null
  userBids: Bid[]
  watchlist: Auction[]
  isLoading: boolean
  fetchAuctions: (filters?: AuctionFilters) => Promise<void>
  fetchFeaturedAuctions: () => Promise<void>
  fetchCategories: () => Promise<void>
  fetchAuction: (id: string) => Promise<Auction | null>
  placeBid: (auctionId: string, amount: number) => Promise<void>
  addToWatchlist: (auctionId: string) => Promise<void>
  removeFromWatchlist: (auctionId: string) => Promise<void>
  createAuction: (auction: Partial<Auction>) => Promise<void>
  updateAuction: (id: string, updates: Partial<Auction>) => Promise<void>
}

interface AuctionFilters {
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  condition?: string
  sortBy?: 'ending_soon' | 'newly_listed' | 'price_low' | 'price_high' | 'most_bids'
}

export const useAuctionStore = create<AuctionState>((set, get) => ({
  auctions: [],
  featuredAuctions: [],
  categories: [],
  currentAuction: null,
  userBids: [],
  watchlist: [],
  isLoading: false,

  fetchAuctions: async (filters?: AuctionFilters) => {
    set({ isLoading: true })

    if (isDemoMode) {
      await new Promise(resolve => setTimeout(resolve, 300))
      let filtered = [...mockAuctions] as Auction[]

      if (filters?.category) {
        filtered = filtered.filter(a => a.category_id === filters.category)
      }
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase()
        filtered = filtered.filter(a =>
          a.title.toLowerCase().includes(searchLower) ||
          a.description.toLowerCase().includes(searchLower)
        )
      }
      if (filters?.minPrice) {
        filtered = filtered.filter(a => a.current_price >= filters.minPrice!)
      }
      if (filters?.maxPrice) {
        filtered = filtered.filter(a => a.current_price <= filters.maxPrice!)
      }
      if (filters?.condition) {
        filtered = filtered.filter(a => a.condition === filters.condition)
      }

      switch (filters?.sortBy) {
        case 'ending_soon':
          filtered.sort((a, b) => new Date(a.end_time).getTime() - new Date(b.end_time).getTime())
          break
        case 'newly_listed':
          filtered.sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime())
          break
        case 'price_low':
          filtered.sort((a, b) => a.current_price - b.current_price)
          break
        case 'price_high':
          filtered.sort((a, b) => b.current_price - a.current_price)
          break
        case 'most_bids':
          filtered.sort((a, b) => b.bid_count - a.bid_count)
          break
      }

      set({ auctions: filtered, isLoading: false })
      return
    }

    set({ isLoading: false })
  },

  fetchFeaturedAuctions: async () => {
    if (isDemoMode) {
      await new Promise(resolve => setTimeout(resolve, 200))
      set({ featuredAuctions: mockAuctions.slice(0, 5) as Auction[] })
    }
  },

  fetchCategories: async () => {
    if (isDemoMode) {
      await new Promise(resolve => setTimeout(resolve, 200))
      set({ categories: mockCategories as Category[] })
    }
  },

  fetchAuction: async (id: string) => {
    set({ isLoading: true })

    if (isDemoMode) {
      await new Promise(resolve => setTimeout(resolve, 300))
      const auction = mockAuctions.find(a => a.id === id) as Auction | null
      set({ currentAuction: auction, isLoading: false })
      return auction
    }

    set({ isLoading: false })
    return null
  },

  placeBid: async (auctionId: string, amount: number) => {
    if (isDemoMode) {
      await new Promise(resolve => setTimeout(resolve, 500))
      const { auctions } = get()
      const updatedAuctions = auctions.map(a =>
        a.id === auctionId
          ? { ...a, current_price: amount, bid_count: a.bid_count + 1 }
          : a
      )
      set({ auctions: updatedAuctions })

      const { currentAuction, featuredAuctions } = get()
      if (currentAuction && currentAuction.id === auctionId) {
        set({ currentAuction: { ...currentAuction, current_price: amount, bid_count: currentAuction.bid_count + 1 } })
      }
      if (featuredAuctions) {
        const updatedFeatured = featuredAuctions.map(a =>
          a.id === auctionId
            ? { ...a, current_price: amount, bid_count: a.bid_count + 1 }
            : a
        )
        set({ featuredAuctions: updatedFeatured })
      }
    }
  },

  addToWatchlist: async (auctionId: string) => {
    if (isDemoMode) {
      await new Promise(resolve => setTimeout(resolve, 200))
      const { auctions, watchlist } = get()
      const auction = auctions.find(a => a.id === auctionId)
      if (auction && !watchlist.find(w => w.id === auctionId)) {
        set({ watchlist: [...watchlist, auction] })
      }
    }
  },

  removeFromWatchlist: async (auctionId: string) => {
    if (isDemoMode) {
      await new Promise(resolve => setTimeout(resolve, 200))
      const { watchlist } = get()
      set({ watchlist: watchlist.filter(a => a.id !== auctionId) })
    }
  },

  createAuction: async (auction: Partial<Auction>) => {
    if (isDemoMode) {
      await new Promise(resolve => setTimeout(resolve, 500))
      const newAuction: Auction = {
        ...auction as Auction,
        id: 'new_' + Date.now(),
        current_price: auction.starting_price || 0,
        status: 'active',
        views: 0,
        watchers_count: 0,
        bid_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      set({ auctions: [...get().auctions, newAuction] })
    }
  },

  updateAuction: async (id: string, updates: Partial<Auction>) => {
    if (isDemoMode) {
      await new Promise(resolve => setTimeout(resolve, 300))
      const { auctions } = get()
      set({
        auctions: auctions.map(a => a.id === id ? { ...a, ...updates, updated_at: new Date().toISOString() } : a)
      })
    }
  },
}))