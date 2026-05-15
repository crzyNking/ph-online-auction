import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useAuctionStore } from '@/stores/auctionStore'

export default function Categories() {
  const { categories } = useAuctionStore()

  const getCategoryEmoji = (name: string) => {
    const emojis: Record<string, string> = {
      'Electronics': '📱',
      'Vehicles': '🚗',
      'Real Estate': '🏠',
      'Fashion': '👗',
      'Home & Garden': '🏡',
      'Sports': '⚽',
      'Collectibles': '💎',
      'Business': '💼',
    }
    return emojis[name] || '📦'
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-24 py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">Browse Categories</h1>
          <p className="mt-2 text-gray-600 text-sm md:text-base">Explore all auction categories</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {categories.map((category, idx) => (
            <Link
              key={category.id}
              to={`/categories/${category.slug}`}
              className="group bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-200 hover:border-teal-300 hover:shadow-xl transition-all animate-fade-in"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="w-14 md:w-20 h-14 md:h-20 bg-gradient-to-br from-teal-50 to-orange-50 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-4xl mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                {getCategoryEmoji(category.name)}
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 mt-1 flex items-center gap-1">
                View items <ChevronRight className="w-3 md:w-4 h-3 md:h-4" />
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}