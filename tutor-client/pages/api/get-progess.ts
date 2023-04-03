// pages/api/get-progress.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { getProgress } from '../../lib/progress';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const progress = await getProgress(session.user.id);
      res.status(200).json(progress);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch progress' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
