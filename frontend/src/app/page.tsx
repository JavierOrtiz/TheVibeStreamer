'use client'

import { useState } from 'react'

export default function Home() {
  const [message, setMessage] = useState('')
  const [assistantResponse, setAssistantResponse] = useState('')

  const handleSend = async () => {
    setAssistantResponse('')
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })

      if (!response.body) return

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
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <main className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">TheVibeStreamer</h1>
        
        <div className="mb-6 p-4 bg-gray-50 rounded min-h-[100px] border border-gray-200">
          <p className="text-gray-800 whitespace-pre-wrap">
            {assistantResponse || 'Assistant response will appear here...'}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handleSend}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors font-semibold"
          >
            Send
          </button>
        </div>
      </main>
    </div>
  )
}
