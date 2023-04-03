
import { Box, Typography } from '@mui/material';
import { useSession } from 'next-auth/client';
import UserDashboard from '../components/UserDashboard';

export default function Home() {
  const [session] = useSession();

  return (
    <Box>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Tutor App
      </Typography>
      {session ? (
        <UserDashboard />
      ) : (
        <Typography variant="h5">Please sign in to view your dashboard.</Typography>
      )}
    </Box>
  );
}
