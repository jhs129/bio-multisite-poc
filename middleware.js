import { NextResponse } from 'next/server';

export function middleware(req) {
  const hostname = req.headers.get('host'); // Extract hostname
  const domainMap = {
    'site1.com': 'site1',
    'site2.com': 'site2',
    'localhost:3000': 'site1', // Local development
  };

  const siteKey = domainMap[hostname];
  if (siteKey) {
    req.headers.set('x-site-key', siteKey); // Pass site key to pages
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL('/404', req.url));
}
