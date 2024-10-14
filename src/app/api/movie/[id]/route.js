import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { clientPromise } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);
    if (session.user.role !== "admin") {
      return NextResponse.json({ msg: "unauthorized" }, { status: 401 });
    }
    const id = req.url.split("/").pop();
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("movieapp");

    const result = await db
      .collection("movies")
      .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: body });

    return NextResponse.json(result, { status: 202 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const id = req.url.split("/").pop();

    const client = await clientPromise;
    const db = client.db("movieapp");
    const movie = await db
      .collection("movies")
      .findOne({ _id: new ObjectId(id) });

    return NextResponse.json({ movie }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const id = req.url.split("/").pop();
    const client = await clientPromise;
    const db = client.db("movieapp");

    const session = await getServerSession(authOptions);
    if (session.user.role !== "admin") {
      return NextResponse.json({ msg: "unauthorized" }, { status: 401 });
    }
  
    const res = await db.collection("movies").deleteOne({ _id: new ObjectId(id) });
    if (res.deletedCount == 1) {
      return NextResponse.json({ msg: "movie delete" }, { status: 202 });
    }
    return NextResponse.json({ msg: "movie not found" }, { status: 404 });
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
