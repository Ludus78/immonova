export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export async function GET() {
  return new Response('API routes are not available in static export')
} 