export interface User {
  id: string
  email: string
  username: string
  full_name: string
  avatar_url: string
  phone?: string
  address?: string
  role: 'buyer' | 'seller' | 'admin'
  verified: boolean
  rating?: number
  review_count?: number
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  parent_id?: string
  image_url?: string
  auction_count?: number
  created_at: string
}

export interface Auction {
  id: string
  seller_id: string
  seller?: User
  title: string
  description: string
  category_id: string
  category?: Category
  condition: 'new' | 'like_new' | 'used' | 'refurbished'
  starting_price: number
  reserve_price?: number
  buy_now_price?: number
  current_price: number
  start_time: string
  end_time: string
  status: 'draft' | 'active' | 'paused' | 'ended' | 'sold'
  views: number
  watchers_count: number
  images: string[]
  location?: string
  shipping_options?: string[]
  tags?: string[]
  bid_count: number
  highest_bidder?: string
  created_at: string
  updated_at: string
}

export interface Bid {
  id: string
  auction_id: string
  bidder_id: string
  bidder?: User
  amount: number
  is_proxy: boolean
  max_amount?: number
  created_at: string
}

export interface Watchlist {
  user_id: string
  auction_id: string
  auction?: Auction
  created_at: string
}

export interface Message {
  id: string
  sender_id: string
  sender?: User
  receiver_id: string
  receiver?: User
  auction_id?: string
  auction?: Auction
  content: string
  read_at?: string
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: 'new_bid' | 'outbid' | 'auction_won' | 'auction_lost' | 'payment_reminder' | 'shipping_update' | 'new_message' | 'system'
  title: string
  body: string
  data?: Record<string, unknown>
  read_at?: string
  created_at: string
}

export interface Payment {
  id: string
  auction_id: string
  buyer_id: string
  amount: number
  method: 'gcash' | 'maya' | 'bank_transfer' | 'card'
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
  transaction_id?: string
  created_at: string
}

export interface Order {
  id: string
  auction_id: string
  auction?: Auction
  buyer_id: string
  buyer?: User
  seller_id: string
  seller?: User
  status: 'pending_payment' | 'paid' | 'shipped' | 'delivered' | 'completed' | 'disputed' | 'cancelled'
  shipping_address: string
  tracking_number?: string
  courier?: string
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  order_id: string
  reviewer_id: string
  reviewer?: User
  rating: number
  comment: string
  photos?: string[]
  seller_response?: string
  created_at: string
}

export interface Report {
  id: string
  reporter_id: string
  reported_type: 'user' | 'auction' | 'message'
  reported_id: string
  reason: 'fraud' | 'scam' | 'inappropriate' | 'spam' | 'other'
  description?: string
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed'
  created_at: string
}

export interface SellerVerification {
  id: string
  user_id: string
  id_type: 'passport' | 'drivers_license' | 'sss' | 'gsis' | 'postal' | 'national_id'
  id_number: string
  id_front_url?: string
  id_back_url?: string
  business_name?: string
  business_permit_url?: string
  status: 'pending' | 'approved' | 'rejected'
  verified_at?: string
  created_at: string
}

export type AuctionCondition = 'new' | 'like_new' | 'used' | 'refurbished'

export type UserRole = 'buyer' | 'seller' | 'admin'

export type AuctionStatus = 'draft' | 'active' | 'paused' | 'ended' | 'sold'

export type PaymentMethod = 'gcash' | 'maya' | 'bank_transfer' | 'card'

export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'

export type OrderStatus = 'pending_payment' | 'paid' | 'shipped' | 'delivered' | 'completed' | 'disputed' | 'cancelled'

export type NotificationType = 'new_bid' | 'outbid' | 'auction_won' | 'auction_lost' | 'payment_reminder' | 'shipping_update' | 'new_message' | 'system'

export interface CreateAuctionInput {
  title: string
  description: string
  category_id: string
  condition: AuctionCondition
  starting_price: number
  reserve_price?: number
  buy_now_price?: number
  duration_days: number
  location?: string
  shipping_options?: string[]
  tags?: string[]
  images: string[]
}

export interface BidInput {
  auction_id: string
  amount: number
  is_proxy?: boolean
  max_amount?: number
}