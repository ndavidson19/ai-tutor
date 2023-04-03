// lib/progress.ts

import { connect } from './db';

// lib/progress.ts

interface ProgressData {
    userId: string;
    subject: string;
    progress: number;
    points: number;
  }
  
  async function saveProgress(progressData: ProgressData) {
    const { db } = await connect();
    const progressCollection = db.collection('progress');
  
    await progressCollection.updateOne(
      { userId: progressData.userId, subject: progressData.subject },
      {
        $set: { progress: progressData.progress },
        $inc: { points: progressData.points },
      },
      { upsert: true }
    );
  }
  
async function getProgress(userId: string) {
    const { db } = await connect();
    const progressCollection = db.collection('progress');
    const progress = await progressCollection.find({ userId }).toArray();
    return progress;
  }
  
export { saveProgress, getProgress };
  
  

