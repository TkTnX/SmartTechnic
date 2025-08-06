import "./_skeleton.scss"

type Props = {
    width?: number,
    height?: number
}

export const Skeleton = ({width, height}: Props) => {
  return (
    <div style={{width, height}} className="skeleton" />
  )
}
