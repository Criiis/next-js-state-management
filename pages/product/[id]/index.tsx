import { NextRouter, useRouter } from 'next/router'

export default function singleProduct(): JSX.Element {
  const router: NextRouter = useRouter()
  const id: string | string[] | undefined = router.query.id

  return (
    <div>
      <h1>this is a product {id}</h1>
    </div>
  )
}

//https://fakestoreapi.com/products/3
