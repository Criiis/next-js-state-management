import type { NextPage } from 'next'
import Title from './components/Title'

const Home: NextPage = () => {
  console.log('hello world!')
  const hello: string = 'yo'
  console.log(hello)

  return (
    <>
      <main>
        <Title title='Hello Index!' />
      </main>
    </>
  )
}

export default Home
