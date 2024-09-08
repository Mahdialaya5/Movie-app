import { NextResponse } from "next/server";
import { MongoClient,ObjectId  } from 'mongodb';
const uri = process.env.MONGODB_URI;
const options = {};

const clientPromise = new MongoClient(uri, options).connect();

export async function PATCH(req) {
  try {
      const id = req.url.split("/").pop()
      const body = await req.json()
      const client = await clientPromise
      const db = client.db('movieapp')

      const result = await db.collection('movies').findOneAndUpdate({ _id: new ObjectId(id) },{ $set: body })

      return NextResponse.json(result)

  } catch (error) {
   
      return NextResponse.json({ error: error.message },{ status: 500 })
  }
}