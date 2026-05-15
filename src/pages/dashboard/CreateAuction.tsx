import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Upload, X, Plus, Image as ImageIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuctionStore } from '@/stores/auctionStore'
import { useNavigate } from 'react-router-dom'

const auctionSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category_id: z.string().min(1, 'Select a category'),
  condition: z.string().min(1, 'Select condition'),
  starting_price: z.number().min(1, 'Starting price is required'),
  buy_now_price: z.number().optional(),
  duration_days: z.number().min(1).max(30),
  location: z.string().optional(),
})

type AuctionForm = z.infer<typeof auctionSchema>

export default function CreateAuction() {
  const navigate = useNavigate()
  const { createAuction, categories } = useAuctionStore()
  const [step, setStep] = useState(1)
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuctionForm>({
    resolver: zodResolver(auctionSchema),
    defaultValues: {
      duration_days: 7,
    },
  })

  const handleAddImage = () => {
    // In a real app, this would handle file upload
    const placeholderImages = [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    ]
    if (images.length < 8) {
      setImages([...images, placeholderImages[images.length % 2]])
    }
  }

  const handleRemoveImage = (idx: number) => {
    setImages(images.filter((_, i) => i !== idx))
  }

  const onSubmit = async (data: AuctionForm) => {
    setIsSubmitting(true)
    try {
      await createAuction({
        ...data,
        condition: data.condition as 'new' | 'like_new' | 'used' | 'refurbished',
        images,
        status: 'active',
        current_price: data.starting_price,
        start_time: new Date().toISOString(),
        end_time: new Date(Date.now() + data.duration_days * 24 * 60 * 60 * 1000).toISOString(),
      } as any)
      toast.success('Auction created successfully!')
      navigate('/dashboard/auctions')
    } catch (error) {
      toast.error('Failed to create auction')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-24 py-6 md:py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Create New Auction</h1>
          <p className="text-gray-600 text-sm md:text-base">List your item for auction</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`w-8 md:w-10 h-8 md:h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                step >= s ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {s}
              </div>
              {s < 2 && (
                <div className={`flex-1 h-0.5 mx-2 md:mx-3 ${step > s ? 'bg-teal-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          {step === 1 && (
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Basic Information</h2>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Photos (up to 8)</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-3">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg md:rounded-xl overflow-hidden border border-gray-200">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 w-5 md:w-6 h-5 md:h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                      >
                        <X className="w-3 md:w-4 h-3 md:h-4" />
                      </button>
                    </div>
                  ))}
                  {images.length < 8 && (
                    <button
                      type="button"
                      onClick={handleAddImage}
                      className="aspect-square rounded-lg md:rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-teal-500 hover:text-teal-600 transition-colors"
                    >
                      <Plus className="w-5 md:w-6 h-5 md:h-6" />
                      <span className="text-xs mt-1">Add</span>
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  {...register('title')}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none text-sm"
                  placeholder="What are you selling?"
                />
                {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  {...register('description')}
                  rows={4}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none text-sm"
                  placeholder="Describe your item in detail..."
                />
                {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-3 md:gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    {...register('category_id')}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none text-sm"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  {errors.category_id && <p className="text-sm text-red-500 mt-1">{errors.category_id.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                  <select
                    {...register('condition')}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none text-sm"
                  >
                    <option value="">Select condition</option>
                    <option value="new">Brand New</option>
                    <option value="like_new">Like New</option>
                    <option value="used">Used</option>
                    <option value="refurbished">Refurbished</option>
                  </select>
                  {errors.condition && <p className="text-sm text-red-500 mt-1">{errors.condition.message}</p>}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-2.5 md:py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors text-sm"
              >
                Continue to Pricing
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Pricing & Duration</h2>

              <div className="grid sm:grid-cols-2 gap-3 md:gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Starting Price (₱)</label>
                  <input
                    type="number"
                    {...register('starting_price', { valueAsNumber: true })}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none text-sm"
                    placeholder="0"
                  />
                  {errors.starting_price && <p className="text-sm text-red-500 mt-1">{errors.starting_price.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Buy Now Price (₱)</label>
                  <input
                    type="number"
                    {...register('buy_now_price', { valueAsNumber: true })}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none text-sm"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (days)</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[1, 3, 5, 7, 14, 30].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => {
                        const field = document.getElementById('duration_days') as HTMLInputElement
                        field.value = d.toString()
                      }}
                      className="py-2 md:py-3 border border-gray-200 rounded-xl hover:border-teal-500 transition-colors text-sm"
                    >
                      {d}
                    </button>
                  ))}
                </div>
                <input type="hidden" {...register('duration_days', { valueAsNumber: true })} id="duration_days" defaultValue={7} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  {...register('location')}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none text-sm"
                  placeholder="City, Province"
                />
              </div>

              <div className="flex gap-2 md:gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-2.5 md:py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-sm"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 md:py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors disabled:opacity-50 text-sm"
                >
                  {isSubmitting ? 'Creating...' : 'Publish Auction'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}