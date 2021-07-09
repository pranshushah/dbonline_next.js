import DashboardComponent from '../src/client/components/DashboardComponent/DashboardComponent';
import { GetServerSidePropsContext } from 'next';
import { checkAuthAndIfTokenIsexpiredGiveNewOne } from '../src/server/utils/checkAuthAndIfTokenIsExpiredGivenNewOne';

type props = {
  authenticated: boolean;
};

export default function dashboard({ authenticated }: props) {
  return <DashboardComponent authenticated={authenticated} />;
}

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const authenticated = await checkAuthAndIfTokenIsexpiredGiveNewOne(req, res);
  console.log(authenticated);
  return {
    props: {
      authenticated,
    },
  };
}
