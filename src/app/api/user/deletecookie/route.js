import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Cookie cleared' });
  
 
  response.cookies.delete('token')

  return response;
}