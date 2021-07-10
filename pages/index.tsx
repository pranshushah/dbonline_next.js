import HomePage from '../src/client/components/HomePage/HomePage';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { checkAuthAndIfTokenIsexpiredGiveNewOne } from '../src/server/utils/checkAuthAndIfTokenIsExpiredGivenNewOne';
import { useSetRecoilState } from 'recoil';
import { authenticatedAtom } from '../src/client/atoms/authenticatedAtom';
import { get, keys } from 'idb-keyval';
import produce from 'immer';

type props = {
  authenticated: boolean;
  signup: boolean | null;
};

export default function Home({ authenticated, signup }: props) {
  const router = useRouter();
  const setAuthenticated = useSetRecoilState(authenticatedAtom);

  useEffect(() => {
    console.log(authenticated);
    if (authenticated) {
      if (router.query.app === '1') {
        return;
      } else {
        keys().then((keys) => {
          if (keys.length !== 0) {
            router.replace('/dashboard');
          }
        });
      }
    }
  }, []);
  useEffect(() => {
    setAuthenticated(authenticated);
  }, [authenticated]);
  useEffect(() => {
    async function sendDataToserver() {
      // we are sending database data which was created before login to the server
      if (signup) {
        let databases: databaseType[] = [];
        const databaseKeys = await keys();
        for (const databaseKey of databaseKeys) {
          const val: databaseType = await get(databaseKey);
          databases = produce(databases, (draft) => {
            draft.push(val);
          });
        }
      }
    }
    sendDataToserver();
  }, [signup]);
  return <HomePage />;
}

export async function getServerSideProps({
  req,
  res,
  query,
}: GetServerSidePropsContext) {
  const authenticated = await checkAuthAndIfTokenIsexpiredGiveNewOne(req, res);
  console.log(query.singup);
  if (authenticated) {
    if (query.app === '1') {
      return {
        props: {
          authenticated,
          signup: query.signup ? query.signup === 'true' : null,
        },
      };
    } else {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      };
    }
  } else {
    return {
      props: {
        authenticated,
        signup: query.signup ? query.signup === 'true' : null,
      },
    };
  }
}
