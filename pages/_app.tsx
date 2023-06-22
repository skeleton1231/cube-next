import { UserProvider } from '@/context/UserContext';
import { AppProps } from 'next/app';


function MyApp({ Component, pageProps }: AppProps) {
  console.log("MyApp loaded")
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
