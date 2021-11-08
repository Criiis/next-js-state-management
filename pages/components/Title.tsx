interface TitleProps {
  title: string // required
  subtitle?: string // optional
}

export default function Title({ title, subtitle }: TitleProps) {
  return (
    <>
      <h1>{title}</h1>
      {subtitle ? <h2>{subtitle}</h2> : ''}
    </>
  )
}
