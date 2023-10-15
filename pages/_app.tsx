import Header from '@/components/ui/header';
import '../app/css/style.css'; // Adjust path as needed
import { UserProvider } from '@/context/UserContext';
import { AppProps } from 'next/app'; // 导入 AppProps
import Footer from '@/components/ui/footer';


// 定义 MyApp 组件，它接受 AppProps 类型的参数
function MyApp({ Component, pageProps }: AppProps) {
  console.log("MyApp loaded");

  return (
    <UserProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </UserProvider>
  );
}

export default MyApp;
