import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import HeadPage from './components/Head'
import Menu from './components/Menu'
import CartProvider from './helper/CartProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <HeadPage />
      <Menu />
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default MyApp
