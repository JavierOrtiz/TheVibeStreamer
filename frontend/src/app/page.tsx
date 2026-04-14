'use client'

import { useState } from 'react'

export default function Home() {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const handleSend = async () => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })
      const data = await response.json()
      if (data.status === 'ack') {
        setStatus('Ack received')
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <main className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">TheVibeStreamer</h1>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handleSend}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
          {status && (
            <p className="text-green-600 text-center font-medium">{status}</p>
          )}
        </div>
      </main>
    </div>
  )
}
