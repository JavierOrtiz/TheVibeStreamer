import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Home from '@/app/page'

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ status: 'ack' }),
  })
) as jest.Mock

describe('Home Page Chat', () => {
  it('renders chat input and send button', () => {
    render(<Home />)
    expect(screen.getByPlaceholderText(/type your message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })

  it('sends a message and receives an ack', async () => {
    render(<Home />)
    const input = screen.getByPlaceholderText(/type your message/i)
    const button = screen.getByRole('button', { name: /send/i })

    fireEvent.change(input, { target: { value: 'Hello AI' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/chat', expect.any(Object))
    })
    
    expect(await screen.findByText(/ack received/i)).toBeInTheDocument()
  })
})
