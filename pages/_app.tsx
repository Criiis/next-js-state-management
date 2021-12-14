import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import HeadPage from './components/Head'
import Menu from './components/Menu'
import CartProvider from './helper/CartProvider'
import SavedItemsProvider from './helper/SavedItemsProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SavedItemsProvider>
      <CartProvider>
        <HeadPage />
        <Menu />
        <Component {...pageProps} />
      </CartProvider>
    </SavedItemsProvider>
  )
}

export default MyApp
