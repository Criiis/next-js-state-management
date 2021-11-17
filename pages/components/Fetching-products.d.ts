export default interface productsDataTypes {
  category: string
  description: string
  id: number
  image: string
  price: number
  rating: rating
  title: string
}

interface rating {
  rate: number
  count: number
}
