// import productsDataTypes from './Fetching-products.d'

export default async function FetchingProducts(callBack: any): Promise<void> {
  const productsURL = 'https://fakestoreapi.com/products'
  try {
    const response = await fetch(productsURL)
    const products = await response.json()
    callBack(products)
  } catch (error) {
    throw new Error('Something went wrong between user and API call')
  }
}
