import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import HeadPage from './components/Head'
import Menu from './components/Menu'
import Footer from './components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeadPage />
      <Menu />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
