import HomePage from '../src/client/components/HomePage/HomePage';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { keys } from 'idb-keyval';
import { GetServerSidePropsContext } from 'next';
import { parse } from 'cookie';
import { decode, JwtPayload } from 'jsonwebtoken';
import { JWT } from '../src/server/utils/jwt';
import { checkAuthAndIfTokenIsexpiredGiveNewOne } from '../src/server/utils/checkAuthAndIfTokenIsExpiredGivenNewOne';

type props = {
  authenticated: boolean;
};

export default function Home({ authenticated }: props) {
  const router = useRouter();
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
  return <HomePage authenticated={authenticated} />;
}

export async function getServerSideProps({
  req,
  res,
  query,
}: GetServerSidePropsContext) {
  const authenticated = await checkAuthAndIfTokenIsexpiredGiveNewOne(req, res);
  console.log(authenticated);
  if (authenticated) {
    if (query.app === '1') {
      return {
        props: {
          authenticated,
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
      },
    };
  }
}
