import '../styles/globals.scss'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'

import HeadPage from './components/Head'
import Menu from './components/Menu'
import CartProvider from './helper/CartProvider'
import SavedItemsProvider from './helper/SavedItemsProvider'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadingBarController = (url: string) => {
      console.clear()
      console.log(router)
      console.log(url)
    }

    router.events.on('routeChangeStart', loadingBarController)
    router.events.on('routeChangeComplete', loadingBarController)
    return () => {
      router.events.off('routeChangeStart', loadingBarController)
      router.events.off('routeChangeComplete', loadingBarController)
    }
  }, [router])

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
