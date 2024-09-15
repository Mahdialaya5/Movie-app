import { MongoClient} from 'mongodb';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'

const uri = process.env.MONGODB_URI;


const clientPromise = new MongoClient(uri).connect()


export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db('movieapp');

    const { email, password} = await req.json()
    const existUser = await db.collection('users').findOne({ email })
    if (existUser) {
         return  NextResponse.json({ msg: "email aleardy exist "},{status:400})
    }
    let passwordhashed= await bcrypt.hash(password,10)
    const result = await db.collection('users').insertOne({ email:email, password:passwordhashed.toString()})
    return NextResponse.json({user:result},{status:201})
    
  } catch (error) {
     return NextResponse.json({ error: error.message })
  }
}


