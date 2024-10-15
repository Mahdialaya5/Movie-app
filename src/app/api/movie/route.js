import { clientPromise } from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';


//add movie
export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db('movieapp');
    
    const session= await getServerSession(authOptions)

      if (session.user.role!=='admin') {
        return NextResponse.json({ msg:'unauthorized' },{status:401});
      }
   const  {title, description,url,src} = await req.json()  

    const result = await db.collection('movies').insertOne({ title, description,url,src });
    return NextResponse.json({ msg: 'Movie added ', result},{status:201});
    
  }
   catch (error) {
     return NextResponse.json({ error: error.message });
  }
}


export async function GET() {
  
  try {
    
    const client = await clientPromise;
    const db = client.db('movieapp');
    const movieList = await db.collection('movies').find().toArray();

    return NextResponse.json({ movies: movieList },{status:200});
  } catch (error) {
    
    return NextResponse.json({ error: error.message },{ status: 500 });
  }
}


