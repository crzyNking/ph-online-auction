import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuctionStore } from '@/stores/auctionStore'
import { useNotificationStore } from '@/stores/notificationStore'

// Layout
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileNav from '@/components/layout/MobileNav'

// Public Pages
import Landing from '@/pages/public/Landing'
import Browse from '@/pages/public/Browse'
import AuctionDetail from '@/pages/public/AuctionDetail'
import Categories from '@/pages/public/Categories'
import HowItWorks from '@/pages/public/HowItWorks'

// Auth Pages
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import ForgotPassword from '@/pages/auth/ForgotPassword'

// Dashboard Pages
import Dashboard from '@/pages/dashboard/Dashboard'
import MyAuctions from '@/pages/dashboard/MyAuctions'
import MyBids from '@/pages/dashboard/MyBids'
import Watchlist from '@/pages/dashboard/Watchlist'
import Messages from '@/pages/dashboard/Messages'
import Notifications from '@/pages/dashboard/Notifications'
import Profile from '@/pages/dashboard/Profile'
import CreateAuction from '@/pages/dashboard/CreateAuction'
import Settings from '@/pages/dashboard/Settings'

// Admin Pages
import AdminDashboard from '@/pages/admin/AdminDashboard'
import UserManagement from '@/pages/admin/UserManagement'
import ListingModeration from '@/pages/admin/ListingModeration'

function App() {
  const { fetchFeaturedAuctions, fetchCategories } = useAuctionStore()
  const { fetchNotifications } = useNotificationStore()

  useEffect(() => {
    fetchFeaturedAuctions()
    fetchCategories()
    fetchNotifications()
  }, [fetchFeaturedAuctions, fetchCategories, fetchNotifications])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 pt-4 md:pt-20 pb-20 md:pb-0">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/auction/:id" element={<AuctionDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:slug" element={<Browse />} />
          <Route path="/how-it-works" element={<HowItWorks />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/auctions" element={<MyAuctions />} />
          <Route path="/dashboard/bids" element={<MyBids />} />
          <Route path="/dashboard/watchlist" element={<Watchlist />} />
          <Route path="/dashboard/messages" element={<Messages />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/create-auction" element={<CreateAuction />} />
          <Route path="/dashboard/settings" element={<Settings />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/listings" element={<ListingModeration />} />
        </Routes>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}

export default App