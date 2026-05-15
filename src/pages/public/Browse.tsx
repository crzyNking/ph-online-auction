import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Filter, Grid, List, X, ChevronDown } from 'lucide-react'
import { useAuctionStore } from '@/stores/auctionStore'
import AuctionCard from '@/components/auction/AuctionCard'

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { auctions, categories, isLoading, fetchAuctions, fetchCategories } = useAuctionStore()

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [sortBy, setSortBy] = useState('newly_listed')
  const [condition, setCondition] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    fetchAuctions({
      search: searchQuery || undefined,
      category: selectedCategory || undefined,
      condition: condition || undefined,
      sortBy: sortBy as 'ending_soon' | 'newly_listed' | 'price_low' | 'price_high' | 'most_bids',
    })
  }, [searchQuery, selectedCategory, sortBy, condition, fetchAuctions])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (searchQuery) {
      params.set('search', searchQuery)
    } else {
      params.delete('search')
    }
    setSearchParams(params)
  }

  const clearFilters = useCallback(() => {
    setSearchQuery('')
    setSelectedCategory('')
    setSortBy('newly_listed')
    setCondition('')
    setSearchParams({})
  }, [setSearchParams])

  const activeFiltersCount = [searchQuery, selectedCategory, condition].filter(Boolean).length

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-24">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 md:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Browse Auctions</h1>
              <p className="text-sm text-gray-600 mt-1">{auctions.length} items found</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm"
              >
                <option value="newly_listed">Newly Listed</option>
                <option value="ending_soon">Ending Soon</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="most_bids">Most Bids</option>
              </select>

              {/* View Toggle */}
              <div className="hidden sm:flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-teal-50 text-teal-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-teal-50 text-teal-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFilters(true)}
                className="sm:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm"
              >
                <Filter className="w-4 h-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 bg-teal-600 text-white text-xs rounded-full flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Active Filter Tags */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
              {searchQuery && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm">
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery('')} className="hover:text-teal-900">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}
              {selectedCategory && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm">
                  Category
                  <button onClick={() => setSelectedCategory('')} className="hover:text-teal-900">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}
              {condition && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm">
                  {condition.replace('_', ' ')}
                  <button onClick={() => setCondition('')} className="hover:text-teal-900">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}
              <button onClick={clearFilters} className="text-sm text-gray-500 hover:text-gray-700 ml-2">
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-36">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                {activeFiltersCount > 0 && (
                  <button onClick={clearFilters} className="text-sm text-teal-600 hover:text-teal-700">
                    Clear
                  </button>
                )}
              </div>

              {/* Search */}
              <form onSubmit={handleSearch} className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Keyword..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm"
                  />
                </div>
              </form>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Condition */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                <div className="space-y-2">
                  {['new', 'like_new', 'used', 'refurbished'].map((cond) => (
                    <label key={cond} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="condition"
                        value={cond}
                        checked={condition === cond}
                        onChange={(e) => setCondition(e.target.value)}
                        className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-sm text-gray-600 capitalize group-hover:text-gray-900">{cond.replace('_', ' ')}</span>
                    </label>
                  ))}
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="condition"
                      value=""
                      checked={condition === ''}
                      onChange={() => setCondition('')}
                      className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">Any</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Auctions Grid */}
          <main className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl overflow-hidden">
                    <div className="aspect-[4/3] skeleton" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 skeleton rounded w-3/4" />
                      <div className="h-6 skeleton rounded w-1/2" />
                      <div className="h-4 skeleton rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : auctions.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No auctions found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6' : 'space-y-4'}>
                {auctions.map((auction) => (
                  <AuctionCard
                    key={auction.id}
                    auction={auction}
                    variant={viewMode === 'list' ? 'horizontal' : 'default'}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto animate-slide-in">
            <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Keyword..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                />
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Condition */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                <div className="space-y-2">
                  {['new', 'like_new', 'used', 'refurbished'].map((cond) => (
                    <label key={cond} className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="condition-mobile"
                        value={cond}
                        checked={condition === cond}
                        onChange={(e) => setCondition(e.target.value)}
                        className="w-4 h-4 text-teal-600"
                      />
                      <span className="capitalize">{cond.replace('_', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={clearFilters}
                  className="flex-1 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="flex-1 py-3 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700"
                >
                  Show {auctions.length} Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}