import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'

//https://randomuser.me/api

function fetchRandomUser(): Promise<any> {
  return fetch('https://randomuser.me/api')
    .then((res) => res.json())
    .then((data) => data.results)
    .catch((err) => {
      console.error(err)
    })
}

const NextJSTraining: NextPage = () => {
  const [userData, setUserData] = useState([])

  useEffect((): void => {
    ;(async () => {
      setUserData(await fetchRandomUser())
    })()
  }, [])

  //return user map
  const eachUSer = userData?.map(({ name, picture }: any) => {
    const userFullName = `${name.title} ${name.first} ${name.last}`
    const userPicture = picture.large
    return (
      <div>
        <p>{userFullName}</p>

        <div
          style={{
            position: 'relative',
            width: '150px',
            paddingBottom: '20%',
          }}
        >
          <Image
            priority={true}
            alt={userFullName}
            src={userPicture}
            layout='fill'
            objectFit='contain' // Scale your image down to fit into the container
          />
        </div>
      </div>
    )
  })

  return (
    <>
      <h1>hello world!</h1>
      {eachUSer}
      <pre>{JSON.stringify(userData, null, 1)}</pre>
    </>
  )
}

export default NextJSTraining
