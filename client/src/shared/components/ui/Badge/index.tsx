import './_badge.scss'

type Props = {
	quantity: number | null
	className?: string
}

export const Badge = ({ quantity, className }: Props) => {
	if (!quantity) return null
	return <div className={`badge ${className}`}>{quantity}</div>
}
