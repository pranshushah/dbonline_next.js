import DashboardComponent from '../src/client/components/DashboardComponent/DashboardComponent';
import { GetServerSidePropsContext } from 'next';
import { checkAuthAndIfTokenIsexpiredGiveNewOne } from '../src/server/utils/checkAuthAndIfTokenIsExpiredGivenNewOne';
import { useSetRecoilState } from 'recoil';
import { authenticatedAtom } from '../src/client/atoms/authenticatedAtom';
import { useEffect } from 'react';
import { get, keys } from 'idb-keyval';
import produce from 'immer';

type props = {
  authenticated: boolean;
  signup: boolean | null;
};

export default function dashboard({ authenticated, signup }: props) {
  const setAuthenticated = useSetRecoilState(authenticatedAtom);

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

  return <DashboardComponent />;
}

export async function getServerSideProps({
  req,
  res,
  query,
}: GetServerSidePropsContext) {
  const authenticated = await checkAuthAndIfTokenIsexpiredGiveNewOne(req, res);

  return {
    props: {
      authenticated,
      signup: query.signup ? query.signup === 'true' : null,
    },
  };
}
