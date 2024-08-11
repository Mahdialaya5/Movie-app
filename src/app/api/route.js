import { MongoClient } from 'mongodb';
import {  NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
const options = {};

const clientPromise = new MongoClient(uri, options).connect();

export async function POST(req) {
  try {

    const client = await clientPromise;
    const db = client.db('movieapp');

    const { title, description,url } = await req.json();

    const result = await db.collection('movies').insertOne({ title, description,url });
    return NextResponse.json({ message: 'Movie added ' });
    
  } catch (error) {
     return NextResponse.json({ error: error.message });
  }
}

export async function GET() {
  try {
    
    const client = await clientPromise;
    const db = client.db('movieapp');
 const moviesCursor = await db.collection('movies').find().toArray();

    return NextResponse.json({ movies: moviesCursor });
  } catch (error) {
    
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}