'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles } from 'lucide-react'

export default function ChatAssistant() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your Deriv Compliance Assistant. I can help you with:\n\n• KYC requirements across 5 jurisdictions\n• Document verification guidance\n• Compliance gap analysis\n• Regulatory updates\n\nWhat would you like to know?'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history: messages })
      })

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-4xl font-serif italic text-white mb-2">AI Compliance Assistant</h1>
        <p className="text-white/40">Ask me anything about KYC and regulatory compliance</p>
      </div>

      {/* Messages */}
      <div className="flex-grow glass-card rounded-2xl border border-white/5 p-6 overflow-y-auto mb-4">
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-deriv-red/10 border border-deriv-red/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-deriv-red" />
                </div>
              )}
              
              <div
                className={`max-w-[70%] rounded-2xl p-4 ${
                  message.role === 'user'
                    ? 'bg-deriv-red/10 border border-deriv-red/20 text-white'
                    : 'bg-white/5 border border-white/10 text-white/90'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </div>

              {message.role === 'user' && (
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-white/60" />
                </div>
              )}
            </div>
          ))}
          
          {loading && (
            <div className="flex gap-4 justify-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-deriv-red/10 border border-deriv-red/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-deriv-red" />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="glass-card rounded-2xl border border-white/5 p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about compliance requirements..."
            className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-deriv-red/50 transition-all"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="px-6 py-3 bg-deriv-red/10 border border-deriv-red/20 rounded-xl text-deriv-red font-medium hover:bg-deriv-red/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 flex flex-wrap gap-2">
        {[
          'What are MFSA KYC requirements?',
          'Explain DIFC compliance',
          'How to verify source of funds?',
          'Document expiry rules'
        ].map((question) => (
          <button
            key={question}
            onClick={() => setInput(question)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white/60 hover:text-white hover:border-white/20 transition-all"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  )
}
