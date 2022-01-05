import loadingStyle from '../styles/components/Loading.module.scss'

interface props {
  loading: boolean
}

export default function Loading(props: props) {
  return (
    <div
      className={`${loadingStyle.loadingContainer} ${
        !props.loading && loadingStyle.loadingFinished
      }`}
    >
      <div className={loadingStyle.loadingInner}></div>
    </div>
  )
}
