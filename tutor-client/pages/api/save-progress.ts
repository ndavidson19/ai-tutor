// pages/api/save-progress.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { saveProgress } from '../../lib/progress';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const progressData = {
      userId: session.user.id,
      subject: req.body.subject,
      progress: req.body.progress,
    };

    try {
      await saveProgress(progressData);
      res.status(200).json({ message: 'Progress saved' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save progress' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
