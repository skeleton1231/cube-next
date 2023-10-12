// supposed not work
import { UserProvider } from '@/context/UserContext';


function MyApp({ Component, pageProps }) {
  console.log("MyApp loaded")

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;