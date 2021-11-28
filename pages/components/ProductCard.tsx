import Link from 'next/link'
import styles from '../../styles/components/ProductCard.module.scss'
import productsDataTypes from './products'

export default function ProductCard({
  el,
}: {
  el: productsDataTypes
}): JSX.Element {
  return (
    <div className={styles.singleProduct}>
      <img loading='lazy' src={el.image} alt={el.title} />
      <p>{el.title}</p>
      <p>{el.price}</p>
      <Link href='/product/[id]' as={`/product/${el.id}`}>
        <a>See product</a>
      </Link>
    </div>
  )
}
