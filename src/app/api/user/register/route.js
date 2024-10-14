import { NextResponse } from 'next/server';
import { clientPromise } from '@/lib/mongodb';
import bcrypt from 'bcrypt'
import { isValidEmail } from '@/middleware';

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db('movieapp');

    const { name,email, password,role} = await req.json()
    if (role) {
      return  NextResponse.json({ msg: "access denied "},{status:401})
    }
  
     const validator = isValidEmail(email)
   if (!validator) {
      return  NextResponse.json({ msg: "please enter a valid email address"},{status:400})
     }
    const existUser = await db.collection('users').findOne({ email })
    if (existUser) {
         return  NextResponse.json({ msg: "email aleardy exist "},{status:400})
    }
    if (!name) {
      return NextResponse.json({ msg:'name should be not empty'},{status:400})
    }
    if (password.length<6) {
      return NextResponse.json({ msg:'passowrd should be 6 characters'},{status:400})
    }
    let passwordhashed= await bcrypt.hash(password,10)
    const result = await db.collection('users').insertOne({name:name, email:email, password:passwordhashed.toString(),role:'user'})
    return NextResponse.json({user:result},{status:201})
    
  } catch (error) {
     return NextResponse.json({ error: error.message })
  }
}


