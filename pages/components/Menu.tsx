import Link from 'next/link'

export default function Menu(): JSX.Element {
  return (
    <ul>
      <li>
        <Link href='/'>
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href='/about'>
          <a>About Us</a>
        </Link>
      </li>
    </ul>
  )
}
