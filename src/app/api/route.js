import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
const clientPromise = new MongoClient(uri).connect();


//addmovie
export async function POST(req) {
  try {

    const client = await clientPromise;
    const db = client.db('movieapp');

    const { title, description,url } = await req.json();
      
    const result = await db.collection('movies').insertOne({ title, description,url });
    return NextResponse.json({ msg: 'Movie added ' },{status:201});
    
  } catch (error) {
     return NextResponse.json({ error: error.message });
  }
}

//getmovies
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


