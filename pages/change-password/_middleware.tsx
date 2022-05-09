//This middleware will check if the user is logged in or not and redirect him to home page if he's already logged in
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest, _ev: NextFetchEvent) {
  const params = req.page.params;

  if (!params || !params.token || params.token.length !== 36) {
    return NextResponse.rewrite(new URL('/error', req.url));
  }
  return NextResponse.next();
}
