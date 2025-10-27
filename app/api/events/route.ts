import { NextRequest, NextResponse } from 'next/server';

// Force this route to be dynamic
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    console.log('Events API called with URL:', request.url);
    
    const { searchParams } = new URL(request.url);
    const eventName = searchParams.get('event');
    
    console.log('Event name:', eventName);

    // Quick test endpoint
    if (eventName === 'test') {
      return NextResponse.json({ message: 'API is working!', timestamp: new Date().toISOString() });
    }

    if (!eventName) {
      console.log('No event name provided');
      return NextResponse.json({ error: 'Event name is required' }, { status: 400 });
    }

     const baseUrl = process.env.FETCH_EVENT_NAME || process.env.NEXT_PUBLIC_FETCH_EVENT_NAME;
     console.log('Base URL configured:', !!baseUrl);

    if (!baseUrl) {
      console.log('No base URL configured');
      return NextResponse.json(
        { error: 'FETCH_EVENT_NAME base URL is not configured' },
        { status: 500 }
      );
    }

     const apiUrl = `${baseUrl}/${encodeURIComponent(eventName)}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to fetch appointments (${response.status}): ${text}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Events API error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}


