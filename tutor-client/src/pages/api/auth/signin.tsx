// pages/auth/signin.tsx

import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { signIn } from 'next-auth/client';
import { Button, Container, Typography } from '@mui/material';

const SignInPage = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Sign In
      </Typography>
      <Button variant="contained" color="primary" onClick={() => signIn('email')}>
        Sign in with Email
      </Button>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default SignInPage;
