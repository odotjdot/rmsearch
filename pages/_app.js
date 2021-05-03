import Router from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import NProgress from 'nprogress'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'nprogress/nprogress.css';
import '../sass/global.scss';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


export default function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence>
    <motion.div 
      key={router.route}
      initial="pageInitial"
      animate="pageAnimate"
      exit="pageExit"
      variants={{
        pageInitial: {
          opacity: 0,
        },
        pageAnimate: {
          opacity: 1,
        },
        pageExit: {
          backgroundColor: 'white',
          // filter: `invert()`,
          opacity: 0,
          transition: {
            duration: .2,
          }
        }
      }}
    >
      <Component {...pageProps} />
    </motion.div>
    </AnimatePresence>
  )
}
