interface TitleProps {
  title: string // required
  subtitle?: string // optional
}

export default function Title({ title, subtitle }: TitleProps): JSX.Element {
  return (
    <>
      <h1 className='title'>{title}</h1>
      {subtitle ? <h2>{subtitle}</h2> : ''}
    </>
  )
}
