'use client'

import { useState } from 'react'

export default function Home() {
  const [message, setMessage] = useState('')
  const [assistantResponse, setAssistantResponse] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)

  const handleSend = async () => {
    if (!message.trim() || isStreaming) return

    const currentMessage = message
    setMessage('') // Clear input immediately
    setAssistantResponse('')
    setIsStreaming(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentMessage }),
      })

      if (!response.body) {
        setIsStreaming(false)
        return
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            setAssistantResponse((prev) => prev + data)
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsStreaming(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 p-4 font-sans selection:bg-blue-500/30">
      <main className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden">
        <header className="p-6 border-b border-zinc-800 bg-zinc-900/50">
          <h1 className="text-2xl font-bold text-zinc-100 text-center tracking-tight">
            TheVibeStreamer <span className="text-blue-500">🌊</span>
          </h1>
        </header>
        
        <div className="p-6 space-y-4">
          <div className="p-4 bg-zinc-950 rounded-lg min-h-[160px] border border-zinc-800 shadow-inner overflow-y-auto">
            <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
              {assistantResponse || (
                <span className="text-zinc-600 italic">Assistant response will appear here...</span>
              )}
            </p>
            {isStreaming && (
              <div className="mt-2 flex items-center gap-2 text-blue-500 text-xs font-medium animate-pulse">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                Streaming...
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isStreaming}
            />
            <button
              onClick={handleSend}
              disabled={isStreaming}
              className={`w-full p-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                isStreaming
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-500 active:scale-[0.98] shadow-lg shadow-blue-900/20'
              }`}
            >
              {isStreaming ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-zinc-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </div>
        </div>
        <footer className="p-4 bg-zinc-950/50 border-t border-zinc-800 text-center">
          <p className="text-zinc-600 text-xs">
            Powered by FastAPI & Next.js Streaming
          </p>
        </footer>
      </main>
    </div>
  )
}
