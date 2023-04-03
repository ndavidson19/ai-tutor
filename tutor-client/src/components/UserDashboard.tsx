// components/UserDashboard.tsx

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
import { Box, CircularProgress, Typography } from '@mui/material';

interface ProgressData {
  subject: string;
  progress: number;
  points: number;
}

const UserDashboard = () => {
  const [session] = useSession();
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProgress = async () => {
      if (session) {
        const response = await fetch('/api/get-progress');
        const data = await response.json();
        setProgressData(data);
      }
      setLoading(false);
    };

    fetchUserProgress();
  }, [session]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Your Dashboard
      </Typography>
      {progressData.map((progress) => (
        <Box key={progress.subject} my={3}>
          <Typography variant="h6">{progress.subject}</Typography>
          <Typography>Points: {progress.points}</Typography>
          <Typography>Progress: {progress.progress.toFixed(2)}%</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default UserDashboard;
