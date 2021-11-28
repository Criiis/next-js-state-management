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
        <Link href='/products'>
          <a>products</a>
        </Link>
      </li>
      <li>
        <Link href='/cart'>
          <a>cart</a>
        </Link>
      </li>
    </ul>
  )
}
