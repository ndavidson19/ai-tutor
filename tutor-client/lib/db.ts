// lib/db.ts

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  if (!client.isConnected()) {
    await client.connect();
  }
  return { db: client.db('tutor-app') };
}

export { connect };
