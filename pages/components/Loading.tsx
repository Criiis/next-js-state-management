import loadingStyle from '../../styles/components/Loading.module.scss'

export default function Loading(props: any) {
  // useEffect(() => {
  //   console.log('loading props', props)
  // }, [props])

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
