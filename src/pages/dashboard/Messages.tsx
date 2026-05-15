import { useState } from 'react'
import { Send, Image, MoreVertical, Search } from 'lucide-react'
import { mockMessages, mockUsers } from '@/lib/supabase'
import { formatRelativeTime } from '@/lib/utils'

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(mockUsers[1])
  const [newMessage, setNewMessage] = useState('')

  const mockChats = [
    { user: mockUsers[1], lastMessage: 'Is this still available?', time: '10 min ago', unread: 2 },
    { user: mockUsers[0], lastMessage: 'Thank you!', time: '2 hours ago', unread: 0 },
  ]

  const handleSend = () => {
    if (!newMessage.trim()) return
    setNewMessage('')
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-24 py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 text-sm md:text-base">Chat with buyers and sellers</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden h-[500px] md:h-[600px] flex">
          {/* Chat List */}
          <div className="w-full sm:w-64 md:w-80 border-r border-gray-200 flex-shrink-0">
            <div className="p-3 md:p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-3 md:pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100%-64px)]">
              {mockChats.map((chat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedChat(chat.user)}
                  className={`w-full p-3 md:p-4 flex items-start gap-2 md:gap-3 hover:bg-gray-50 transition-colors text-left ${
                    selectedChat.id === chat.user.id ? 'bg-teal-50' : ''
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={chat.user.avatar_url}
                      alt={chat.user.username}
                      className="w-9 md:w-10 h-9 md:h-10 rounded-full"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 md:w-3 h-2.5 md:h-3 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900 text-sm truncate">{chat.user.username}</p>
                      <span className="text-xs text-gray-500 flex-shrink-0">{chat.time}</span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <span className="w-5 h-5 bg-teal-600 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0">
                      {chat.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="hidden md:flex flex-1 flex-col">
            {/* Chat Header */}
            <div className="p-3 md:p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <img
                  src={selectedChat.avatar_url}
                  alt={selectedChat.username}
                  className="w-9 md:w-10 h-9 md:h-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900 text-sm md:text-base">{selectedChat.username}</p>
                  <p className="text-xs md:text-sm text-green-600">Online</p>
                </div>
              </div>
              <button className="p-1.5 md:p-2 text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-4 md:w-5 h-4 md:h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
              {mockMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender_id === selectedChat.id ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs md:max-w-sm px-3 md:px-4 py-2 rounded-2xl text-sm ${
                      msg.sender_id === selectedChat.id
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-teal-600 text-white'
                    }`}
                  >
                    <p>{msg.content}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender_id === selectedChat.id ? 'text-gray-500' : 'text-teal-200'
                    }`}>
                      {formatRelativeTime(msg.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 md:p-4 border-t border-gray-200">
              <div className="flex items-center gap-2 md:gap-3">
                <button className="p-1.5 md:p-2 text-gray-400 hover:text-gray-600">
                  <Image className="w-4 md:w-5 h-4 md:h-5" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 md:px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-teal-500 text-sm"
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button
                  onClick={handleSend}
                  className="p-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors"
                >
                  <Send className="w-4 md:w-5 h-4 md:h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Chat Placeholder */}
          <div className="md:hidden flex-1 flex items-center justify-center bg-gray-50">
            <p className="text-gray-400 text-sm">Select a chat to view messages</p>
          </div>
        </div>
      </div>
    </div>
  )
}