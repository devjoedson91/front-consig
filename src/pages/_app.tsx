import 'bootstrap/dist/css/bootstrap.min.css';
import {AppProps} from 'next/app';
import '../../styles/globals.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </>
  )
}

export default MyApp
