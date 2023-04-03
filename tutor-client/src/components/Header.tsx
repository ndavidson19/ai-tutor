// components/Header.tsx

import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/client';

const Header = () => {
  const [session] = useSession();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Tutor App
        </Typography>
        {!session ? (
          <Button color="inherit" onClick={() => signIn()}>
            Sign In
          </Button>
        ) : (
          <Button color="inherit" onClick={() => signOut()}>
            Sign Out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
