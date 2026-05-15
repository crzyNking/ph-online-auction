import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Filter, Grid, List, X } from 'lucide-react'
import { useAuctionStore } from '@/stores/auctionStore'
import AuctionCard from '@/components/auction/AuctionCard'

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { auctions, categories, isLoading, fetchAuctions, fetchCategories } = useAuctionStore()

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000])
  const [sortBy, setSortBy] = useState<string>('newly_listed')
  const [condition, setCondition] = useState<string>('')

  // Load initial data once
  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  // Fetch auctions with filters
  useEffect(() => {
    fetchAuctions({
      search: searchQuery || undefined,
      category: selectedCategory || undefined,
      minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
      maxPrice: priceRange[1] < 1000000 ? priceRange[1] : undefined,
      condition: condition || undefined,
      sortBy: sortBy as 'ending_soon' | 'newly_listed' | 'price_low' | 'price_high' | 'most_bids',
    })
  }, [searchQuery, selectedCategory, priceRange, sortBy, condition, fetchAuctions])

  // Sync with URL params
  useEffect(() => {
    const urlSearch = searchParams.get('search')
    const urlCategory = searchParams.get('category')
    if (urlSearch !== null && urlSearch !== searchQuery) setSearchQuery(urlSearch)
    if (urlCategory !== null && urlCategory !== selectedCategory) setSelectedCategory(urlCategory)
  }, [searchParams])

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
    setPriceRange([0, 1000000])
    setSortBy('newly_listed')
    setCondition('')
    setSearchParams({})
  }, [setSearchParams])

  const activeFiltersCount = [searchQuery, selectedCategory, condition, priceRange[0] > 0 || priceRange[1] < 1000000].filter(Boolean).length

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 md:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Browse Auctions</h1>
          <p className="mt-1 text-gray-600 text-sm md:text-base">{auctions.length} auctions found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 sticky top-36">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                {activeFiltersCount > 0 && (
                  <button onClick={clearFilters} className="text-sm text-teal-600 hover:text-teal-700">
                    Clear all
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-4 md:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Keyword..."
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </form>
              </div>

              {/* Categories */}
              <div className="mb-4 md:mb-6">
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

              {/* Price Range */}
              <div className="mb-4 md:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    placeholder="Min"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    placeholder="Max"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm"
                  />
                </div>
              </div>

              {/* Condition */}
              <div className="mb-4 md:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                <div className="space-y-2">
                  {['new', 'like_new', 'used', 'refurbished'].map((cond) => (
                    <label key={cond} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="condition"
                        value={cond}
                        checked={condition === cond}
                        onChange={(e) => setCondition(e.target.value)}
                        className="text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-sm text-gray-600 capitalize">{cond.replace('_', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4 md:mb-6 gap-4">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 bg-teal-600 text-white text-xs rounded-full flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-3 md:gap-4 ml-auto">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 md:px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm"
                >
                  <option value="newly_listed">Newly Listed</option>
                  <option value="ending_soon">Ending Soon</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="most_bids">Most Bids</option>
                </select>

                {/* View Mode */}
                <div className="hidden sm:flex items-center bg-white border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-teal-50 text-teal-600' : 'text-gray-400'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-teal-50 text-teal-600' : 'text-gray-400'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm">
                    Search: {searchQuery}
                    <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm">
                    Category
                    <button onClick={() => setSelectedCategory('')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {condition && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm">
                    {condition.replace('_', ' ')}
                    <button onClick={() => setCondition('')}><X className="w-3 h-3" /></button>
                  </span>
                )}
              </div>
            )}

            {/* Auctions Grid */}
            {isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl overflow-hidden">
                    <div className="aspect-[4/3] skeleton" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 skeleton rounded" />
                      <div className="h-6 skeleton rounded w-1/2" />
                      <div className="h-4 skeleton rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : auctions.length === 0 ? (
              <div className="text-center py-12 md:py-16">
                <div className="w-16 md:w-20 h-16 md:h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No auctions found</h3>
                <p className="text-gray-600 mb-4 text-sm md:text-base">Try adjusting your filters or search terms</p>
                <button onClick={clearFilters} className="px-6 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm md:text-base">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6' : 'space-y-4'}>
                {auctions.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} variant={viewMode === 'list' ? 'horizontal' : 'default'} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[80vh] overflow-y-auto animate-slide-in">
            <div className="sticky top-0 bg-white p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Keyword..." className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                  <option value="">All Categories</option>
                  {categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                <div className="space-y-2">
                  {['new', 'like_new', 'used', 'refurbished'].map((cond) => (
                    <label key={cond} className="flex items-center gap-2">
                      <input type="radio" name="condition-mobile" value={cond} checked={condition === cond} onChange={(e) => setCondition(e.target.value)} />
                      <span className="text-sm capitalize">{cond.replace('_', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button onClick={() => setShowFilters(false)} className="w-full py-3 bg-teal-600 text-white font-semibold rounded-xl">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}