import "./_skeleton.scss";





type Props = {
	width?: number
	height?: number
	className?: string
}

export const Skeleton = ({width, height, className}: Props) => {
  return (
    <div style={{width, height}} className={`skeleton ${className}`} />
  )
}