import { Link, useLocation } from 'react-router-dom'
import { Home, Search, PlusCircle, Heart, User } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import clsx from 'clsx'

export default function MobileNav() {
  const location = useLocation()
  const { isAuthenticated } = useAuthStore()

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Browse', path: '/browse', icon: Search },
    { name: 'Sell', path: '/dashboard/create-auction', icon: PlusCircle },
    { name: 'Watchlist', path: '/dashboard/watchlist', icon: Heart },
    { name: 'Profile', path: isAuthenticated ? '/dashboard' : '/login', icon: User },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-safe">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon

          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                "flex flex-col items-center justify-center w-16 h-full transition-colors",
                isActive ? "text-teal-600" : "text-gray-500"
              )}
            >
              <Icon className={clsx("w-5 h-5", isActive && "fill-teal-600")} />
              <span className="text-xs mt-1 font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}