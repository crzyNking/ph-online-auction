import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Camera, Shield, Star, MapPin, Phone, Mail, User } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import toast from 'react-hot-toast'

const profileSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  phone: z.string().min(11, 'Enter a valid phone number'),
  address: z.string().min(5, 'Enter your address'),
})

type ProfileForm = z.infer<typeof profileSchema>

export default function Profile() {
  const { user, updateProfile } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.full_name || '',
      username: user?.username || '',
      phone: user?.phone || '',
      address: user?.address || '',
    },
  })

  const onSubmit = (data: ProfileForm) => {
    updateProfile(data)
    setIsEditing(false)
    toast.success('Profile updated successfully!')
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-24 py-6 md:py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 text-sm md:text-base">Manage your personal information</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Cover & Avatar */}
          <div className="relative h-24 md:h-32 bg-gradient-to-r from-teal-500 to-teal-600">
            <div className="absolute -bottom-10 md:-bottom-12 left-4 md:left-6">
              <div className="relative">
                <div className="w-20 md:w-24 h-20 md:h-24 rounded-2xl border-4 border-white bg-white flex items-center justify-center overflow-hidden">
                  {user?.avatar_url ? (
                    <img src={user.avatar_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 md:w-10 h-8 md:h-10 text-gray-400" />
                  )}
                </div>
                <button className="absolute bottom-0 right-0 w-7 md:w-8 h-7 md:h-8 bg-teal-600 text-white rounded-full flex items-center justify-center hover:bg-teal-700 transition-colors">
                  <Camera className="w-3 md:w-4 h-3 md:h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-12 md:pt-16 pb-6 md:pb-8 px-4 md:px-6">
            {/* Verification Badge */}
            {user?.verified && (
              <div className="flex items-center gap-2 mb-4 md:mb-6 p-2 md:p-3 bg-teal-50 rounded-xl">
                <Shield className="w-4 md:w-5 h-4 md:h-5 text-teal-600" />
                <span className="text-teal-700 font-medium text-sm">Verified Seller</span>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6 md:mb-8">
              <div className="text-center p-2 md:p-4 bg-gray-50 rounded-xl">
                <p className="text-xl md:text-2xl font-bold text-gray-900">4.8</p>
                <div className="flex items-center justify-center gap-1 text-yellow-500">
                  <Star className="w-3 md:w-4 h-3 md:h-4 fill-current" />
                </div>
                <p className="text-xs md:text-sm text-gray-500 mt-1">Rating</p>
              </div>
              <div className="text-center p-2 md:p-4 bg-gray-50 rounded-xl">
                <p className="text-xl md:text-2xl font-bold text-gray-900">156</p>
                <p className="text-xs md:text-sm text-gray-500 mt-1">Reviews</p>
              </div>
              <div className="text-center p-2 md:p-4 bg-gray-50 rounded-xl">
                <p className="text-xl md:text-2xl font-bold text-gray-900">98%</p>
                <p className="text-xs md:text-sm text-gray-500 mt-1">Response</p>
              </div>
            </div>

            {/* Form */}
            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-5">
                <div className="grid sm:grid-cols-2 gap-3 md:gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-400" />
                      <input
                        {...register('fullName')}
                        className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3 border border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none text-sm"
                      />
                    </div>
                    {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input
                      {...register('username')}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none text-sm"
                    />
                    {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 md:gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-400" />
                      <input
                        {...register('phone')}
                        className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3 border border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none text-sm"
                      />
                    </div>
                    {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-400" />
                      <input
                        {...register('address')}
                        className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3 border border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none text-sm"
                      />
                    </div>
                    {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>}
                  </div>
                </div>
                <div className="flex gap-2 md:gap-3 flex-wrap">
                  <button
                    type="submit"
                    className="px-4 md:px-6 py-2.5 md:py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors text-sm"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 md:px-6 py-2.5 md:py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 md:space-y-5">
                <div className="grid sm:grid-cols-2 gap-3 md:gap-5">
                  <div>
                    <p className="text-xs md:text-sm text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-900 text-sm md:text-base">{user?.full_name || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-500">Username</p>
                    <p className="font-medium text-gray-900 text-sm md:text-base">@{user?.username || 'Not set'}</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 md:gap-5">
                  <div>
                    <p className="text-xs md:text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900 flex items-center gap-1 md:gap-2 text-sm">
                      <Mail className="w-3 md:w-4 h-3 md:h-4" />
                      {user?.email || 'Not set'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900 flex items-center gap-1 md:gap-2 text-sm">
                      <Phone className="w-3 md:w-4 h-3 md:h-4" />
                      {user?.phone || 'Not set'}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Address</p>
                  <p className="font-medium text-gray-900 flex items-center gap-1 md:gap-2 text-sm">
                    <MapPin className="w-3 md:w-4 h-3 md:h-4" />
                    {user?.address || 'Not set'}
                  </p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 md:px-6 py-2.5 md:py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors text-sm"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}