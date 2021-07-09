import DashboardComponent from '../src/client/components/DashboardComponent/DashboardComponent';
import { GetServerSidePropsContext } from 'next';
export default function dashboard() {
  return <DashboardComponent />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
