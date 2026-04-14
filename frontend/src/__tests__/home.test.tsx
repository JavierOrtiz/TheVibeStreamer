import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import Home from '@/app/page'

// Mock the fetch function for streaming
global.fetch = jest.fn() as jest.Mock

describe('Home Page Streaming Chat Improvements', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders chat components with dark theme accessible text', () => {
    render(<Home />)
    const title = screen.getByText(/TheVibeStreamer/i)
    expect(title).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/type your message/i)).toBeInTheDocument()
  })

  it('clears input and disables button during streaming', async () => {
    // Delay the stream completion to catch the intermediate state
    const mockStream = new ReadableStream({
      async start(controller) {
        controller.enqueue(new TextEncoder().encode('data: Hello\n\n'))
        await new Promise(resolve => setTimeout(resolve, 50))
        controller.close()
      },
    })

    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      body: mockStream,
    })

    render(<Home />)
    const input = screen.getByPlaceholderText(/type your message/i)
    const button = screen.getByRole('button', { name: /send message/i })

    fireEvent.change(input, { target: { value: 'Hi assistant' } })
    
    fireEvent.click(button)

    // Input should be cleared immediately
    expect(input).toHaveValue('')
    
    // Check for streaming indicator and disabled state
    const streamingIndicator = await screen.findByText(/^Streaming\.\.\.$/i)
    expect(streamingIndicator).toBeInTheDocument()
    expect(button).toBeDisabled()

    await waitFor(() => {
      expect(screen.getByText(/Hello/i)).toBeInTheDocument()
    })

    // Button should be re-enabled after stream ends
    await waitFor(() => {
      expect(button).not.toBeDisabled()
    }, { timeout: 2000 })
  })
})
