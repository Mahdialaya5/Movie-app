import { clientPromise } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from 'next/server';
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  
    try {
      const session= await getServerSession(authOptions)

      if (session?.user.role!=='admin') {
        return NextResponse.json({ msg:'unauthorized' },{status:401});
      }
      const client = await clientPromise;
      const db = client.db('movieapp');
      const users = await db.collection('users').find().toArray();
  
      return NextResponse.json({ users: users },{status:200});
      
    } catch (error) {
      
      return NextResponse.json({ error: error.message },{ status: 500 });
    }
  }
  