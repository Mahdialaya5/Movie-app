import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
export const clientPromise = new MongoClient(uri).connect();
