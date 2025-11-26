import '../styles.css';
import Layout from '../components/Layout';
import AuthGuard from '../components/AuthGuard';
import { Toaster } from 'react-hot-toast';

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthGuard>
      <Layout>
        <Toaster position="top-right" />
        <Component {...pageProps} />
      </Layout>
    </AuthGuard>
  );
}
