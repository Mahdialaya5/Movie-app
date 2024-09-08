import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
const uri = process.env.MONGODB_URI;


const clientPromise = new MongoClient(uri).connect();

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db('movieapp');

    const { email, password} = await req.json();
    const existUser = await db.collection('users').findOne({ email })
    if (!existUser) {
       
        return  NextResponse.json({ msg: "bad credential !!" },{status:400})
    }
    const isMatched = await bcrypt.compare(password, existUser.password)

    if (!isMatched) {
        return  NextResponse.json({ msg: "bad credential !!" },{status:400})
    }
    const payload = { _id: existUser._id }
    const token = jwt.sign(payload, process.env.secretKey,{ expiresIn: '1h' })
 
    const response = NextResponse.json({ msg:'login succes' }, { status: 200 });
        response.headers.set(
           'Set-Cookie',
           `token=${token}; Path=/;`
        )   
    return response
  } catch (error) {
     return NextResponse.json({ error: error.message });
  }
}
