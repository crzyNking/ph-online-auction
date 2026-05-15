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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Browse Categories</h1>
          <p className="mt-2 text-gray-600">Explore all auction categories</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, idx) => (
            <Link
              key={category.id}
              to={`/categories/${category.slug}`}
              className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-teal-300 hover:shadow-xl transition-all animate-fade-in"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-teal-50 to-orange-50 rounded-2xl flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform">
                {getCategoryEmoji(category.name)}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                View items <ChevronRight className="w-4 h-4" />
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}