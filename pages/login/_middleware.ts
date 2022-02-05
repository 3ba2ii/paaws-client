//This middleware will check if the user is logged in or not and redirect him to home page if he's already logged in
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest, _ev: NextFetchEvent) {
  const cookies = req.cookies;
  if (cookies && cookies.qid) {
    return NextResponse.redirect('/');
  }
  return NextResponse.next();
}
