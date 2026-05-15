import { Link } from 'react-router-dom'
import { Search, Gavel, CreditCard, Truck, Shield, Star, MessageCircle, ArrowRight } from 'lucide-react'

export default function HowItWorks() {
  const buyerSteps = [
    {
      icon: Search,
      title: 'Find Items',
      description: 'Browse thousands of auctions or search for specific items using our powerful search filters.',
    },
    {
      icon: Gavel,
      title: 'Place Your Bid',
      description: 'Enter your maximum bid and let our proxy bidding system automatically bid for you.',
    },
    {
      icon: CreditCard,
      title: 'Win & Pay',
      description: 'When you win, complete payment securely through GCash, Maya, or bank transfer.',
    },
    {
      icon: Truck,
      title: 'Receive Item',
      description: 'Track your shipment and confirm delivery once you receive your item.',
    },
  ]

  const sellerSteps = [
    {
      icon: Shield,
      title: 'Create Account',
      description: 'Sign up and verify your identity to start selling on PH Auction.',
    },
    {
      icon: Search,
      title: 'List Items',
      description: 'Upload photos, set your starting price and duration, and publish your auction.',
    },
    {
      icon: Gavel,
      title: 'Manage Bids',
      description: 'Watch in real-time as buyers compete for your item.',
    },
    {
      icon: CreditCard,
      title: 'Get Paid',
      description: 'Receive payment securely and ship the item to the winner.',
    },
  ]

  const features = [
    {
      icon: Shield,
      title: 'Buyer Protection',
      description: 'Every purchase is covered by our buyer protection guarantee.',
    },
    {
      icon: MessageCircle,
      title: 'Direct Communication',
      description: 'Chat directly with sellers to ask questions or negotiate deals.',
    },
    {
      icon: Star,
      title: 'Verified Sellers',
      description: 'All verified sellers undergo identity checks for your safety.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How PH Auction Works</h1>
          <p className="text-xl text-teal-100">
            Buy and sell items safely through competitive bidding
          </p>
        </div>
      </section>

      {/* For Buyers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-teal-600 font-semibold">FOR BUYERS</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Start Bidding in 4 Steps</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {buyerSteps.map((step, idx) => (
              <div key={step.title} className="text-center relative">
                <div className="w-20 h-20 mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4">
                  <step.icon className="w-10 h-10 text-teal-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
                {idx < buyerSteps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-teal-300 to-orange-300" />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors"
            >
              Start Bidding <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* For Sellers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-orange-600 font-semibold">FOR SELLERS</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Sell Your Items in 4 Steps</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {sellerSteps.map((step, idx) => (
              <div key={step.title} className="text-center relative">
                <div className="w-20 h-20 mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4">
                  <step.icon className="w-10 h-10 text-orange-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
                {idx < sellerSteps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-orange-300 to-teal-300" />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/register?role=seller"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors"
            >
              Start Selling <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose PH Auction?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                q: 'How does proxy bidding work?',
                a: 'When you set your maximum bid, our system will automatically bid on your behalf, starting with the minimum increment, up to your maximum. You never need to monitor the auction.',
              },
              {
                q: 'What payment methods are accepted?',
                a: 'We accept GCash, Maya, bank transfers, and credit/debit cards through PayMongo. All payments are processed securely.',
              },
              {
                q: 'How do I know a seller is trustworthy?',
                a: 'Verified sellers have passed identity verification and display a trusted badge. You can also check seller ratings and reviews from previous buyers.',
              },
              {
                q: 'What happens if I win an auction?',
                a: 'You will receive a notification and payment instructions. Complete payment within the specified time, and the seller will ship your item.',
              },
            ].map((item, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}