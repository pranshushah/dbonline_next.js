import HomePage from '../src/components/HomePage/HomePage';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { keys } from 'idb-keyval';
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    keys().then((keys) => {
      console.log(keys);
      if (keys.length !== 0) {
        router.replace('/dashboard');
      }
    });
  }, []);
  return <HomePage />;
}
