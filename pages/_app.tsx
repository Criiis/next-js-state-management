import '../styles/globals.scss'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'

import HeadPage from './components/Head'
import Menu from './components/Menu'
import CartProvider from './helper/CartProvider'
import SavedItemsProvider from './helper/SavedItemsProvider'
import Loading from './components/Loading'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadingBarController = (url: string) => {
      router.asPath !== url ? setLoading(true) : setLoading(false)
    }

    const loadingBarCompleted = () => setLoading(false)

    router.events.on('routeChangeStart', loadingBarController)
    router.events.on('routeChangeComplete', loadingBarCompleted)
    router.events.on('routeChangeError', loadingBarCompleted)
    return () => {
      router.events.off('routeChangeStart', loadingBarController)
      router.events.off('routeChangeComplete', loadingBarCompleted)
      router.events.off('routeChangeError', loadingBarCompleted)
    }
  }, [router])

  return (
    <>
      <Loading loading={loading} />
      <SavedItemsProvider>
        <CartProvider>
          <HeadPage />
          <Menu />
          <Component {...pageProps} />
        </CartProvider>
      </SavedItemsProvider>
    </>
  )
}

export default MyApp
