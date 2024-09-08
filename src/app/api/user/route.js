import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'
import  jwt from 'jsonwebtoken'
const uri = process.env.MONGODB_URI;


const clientPromise = new MongoClient(uri).connect()

//register
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

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db('movieapp');
    const token = req.headers.get('authorization').slice(7)
    if (token) {
        const  decoded = jwt.verify(token, process.env.secretKey)
        const user = await db.collection('users').findOne({_id:new ObjectId(decoded._id)},{projection:{password: 0}})
     return NextResponse.json({user:user},{status:200})
    }
    return NextResponse.json({error: 'user not found'},{ status:404});
    
  } catch (error) {
     return NextResponse.json({ error: error.message })
  }
}
