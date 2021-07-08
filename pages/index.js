import HomePage from '../src/client/components/HomePage/HomePage';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { keys } from 'idb-keyval';
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (router.query.app === '1') {
      return;
    } else {
      keys().then((keys) => {
        if (keys.length !== 0) {
          router.replace('/dashboard');
        }
      });
    }
  }, []);
  return <HomePage />;
}
