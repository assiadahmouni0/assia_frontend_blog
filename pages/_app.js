import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';
import Aos from '@/components/Aos';
import ScrollToTopBtn from '@/components/ScrollToTopBtn';
import TopLoadingLine from '@/components/TopLoadingLine';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main>
        <TopLoadingLine />
        <Aos>
          <Component {...pageProps} />
        </Aos>
       <ScrollToTopBtn />
      </main>
      <Footer />
    </>
  );
}
