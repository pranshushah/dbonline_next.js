import '../styles/styles.scss';
import 'react-virtualized/styles.css';
import { RecoilRoot } from 'recoil';
function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
