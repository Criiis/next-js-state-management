import { useRouter } from 'next/router'

export default function singleProduct() {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <h1>this is a product {id}</h1>
    </div>
  )
}
