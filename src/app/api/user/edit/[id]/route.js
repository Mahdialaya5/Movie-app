import { NextResponse } from 'next/server';
import { clientPromise } from '@/lib/mongodb';
import { ObjectId  } from 'mongodb';
import bcrypt from 'bcrypt'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';


export async function PATCH(req) {
    try {
      const client = await clientPromise;
      const db = client.db('movieapp');
      const session= await getServerSession(authOptions)
      
      if (!session.user) {
        return NextResponse.json({ msg:'unauthorized' },{status:401});
      }
      const id = req.url.split("/").pop()
      const {newpassword} = await req.json()

      if (newpassword) {
        if (newpassword.length<6) {
          return  NextResponse.json({ msg: "password should be 6 characteres "},{status:400})
        }
        let passwordhashed= await bcrypt.hash(newpassword,10)
        var resultone = await db.collection('users').findOneAndUpdate({ _id: new ObjectId(id) },{$set:{password:passwordhashed }})
      }
      if ( resultone ) {
            
        return NextResponse.json({msg:"update succes"},{status:202})
      }
       return NextResponse.json({msg:"bad request"},{status:400})
      
    } catch (error) {
       return NextResponse.json({ error: error.message },{status:502})
    }
  }