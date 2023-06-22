// pages/_app.js
import { AppProps } from 'next/app';
import { useCurrentUser } from "@/app/hook/user";
import Header from "@/components/ui/header";

function MyApp({ Component, pageProps }: AppProps) {
  const { user } = useCurrentUser();

  return (
    <>
      <Header user={user} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
