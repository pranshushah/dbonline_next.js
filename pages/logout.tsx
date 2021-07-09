import { GetServerSidePropsContext } from 'next';
import { JWT } from '../src/server/utils/jwt';

export default function logout() {
  return <div>Logging out...</div>;
}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  JWT.removeBothCookies(res);
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
}
