import { getStaticProps } from '../pages/products'

//start doing mock of data
;(global.fetch as any) = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        props: {
          data: [
            { title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops' },
          ],
        },
      }),
  })
)

test('testing api call for all products', async () => {
  const data = await getStaticProps() 
  console.log(data)
  // expect(data.props.data[0].title).toBe(
  //   'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops'
  // )
})
