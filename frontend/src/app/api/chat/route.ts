import { NextRequest, NextResponse } from 'next/server'

const configuredBackendUrl = process.env.BACKEND_URL
const backendBaseUrls = [
  configuredBackendUrl,
  'http://backend:8000',
  'http://localhost:8000',
].filter((url): url is string => Boolean(url))

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    for (const backendBaseUrl of backendBaseUrls) {
      try {
        const backendResponse = await fetch(`${backendBaseUrl}/api/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })

        const data = await backendResponse.json()

        return NextResponse.json(data, { status: backendResponse.status })
      } catch {
        // Try next backend URL when current target is unreachable.
      }
    }

    return NextResponse.json(
      { error: 'Could not reach backend service' },
      { status: 502 }
    )
  } catch (error) {
    console.error('Error proxying chat request:', error)
    return NextResponse.json(
      { error: 'Could not process chat request' },
      { status: 500 }
    )
  }
}
