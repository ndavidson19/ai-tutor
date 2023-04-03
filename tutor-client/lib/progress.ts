// lib/progress.ts

import { connect } from './db';

interface ProgressData {
  userId: string;
  subject: string;
  progress: number;
}

async function saveProgress(progressData: ProgressData) {
  const { db } = await connect();
  const progressCollection = db.collection('progress');

  await progressCollection.updateOne(
    { userId: progressData.userId, subject: progressData.subject },
    { $set: progressData },
    { upsert: true }
  );
}

export { saveProgress };
