// tutor-client/pages/index.tsx

import { useRouter } from 'next/router';
import { useEffect } from 'react';

const IndexPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/home');
  }, [router]);

  return null;
};

export default IndexPage;
