import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const host = req.nextUrl.hostname;



  if (!req.nextUrl.pathname.startsWith('/styles')) {
    if (host.startsWith('s1')) {
      // Rewrite requests to s1-bio-multisite-poc.vercel.app to /site1
      req.nextUrl.pathname = `/site1${req.nextUrl.pathname}`;
    } else if (host.startsWith('s2')) {
      // Rewrite requests to s2-bio-multisite-poc.vercel.app to /site2
      req.nextUrl.pathname = `/site2${req.nextUrl.pathname}`;
    }
  }

  console.log('Middleware Path Rewrite:', req.nextUrl.pathname);


  return NextResponse.rewrite(req.nextUrl);
}

export const config = {
  matcher: '/:path*',
};
