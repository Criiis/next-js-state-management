import { getStaticProps } from '../pages/products'

test('testing api call for all products', async () => {
  const data = await getStaticProps()
  console.log(data.props.data[0].title)
  expect(data.props.data[0].title).toBe(
    'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops'
  )
})
