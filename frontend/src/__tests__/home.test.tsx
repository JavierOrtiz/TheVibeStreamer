import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Home from '@/app/page'

// Mock the fetch function for streaming
global.fetch = jest.fn() as jest.Mock

describe('Home Page Streaming Chat', () => {
  it('renders chat input and send button', () => {
    render(<Home />)
    expect(screen.getByPlaceholderText(/type your message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })

  it('sends a message and displays the streaming response incrementally', async () => {
    const mockStream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode('data: Hello \n\n'))
        controller.enqueue(new TextEncoder().encode('data: World\n\n'))
        controller.close()
      },
    })

    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      body: mockStream,
    })

    render(<Home />)
    const input = screen.getByPlaceholderText(/type your message/i)
    const button = screen.getByRole('button', { name: /send/i })

    fireEvent.change(input, { target: { value: 'Hi' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/chat', expect.any(Object))
    })

    // Check incremental updates
    expect(await screen.findByText(/Hello/i)).toBeInTheDocument()
    expect(await screen.findByText(/Hello World/i)).toBeInTheDocument()
  })
})
