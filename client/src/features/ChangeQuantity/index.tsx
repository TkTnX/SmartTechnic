import './_changeQuantity.scss'

type Props = {
	quantity: number
	productQuantity: number
}

export const ChangeQuantity = ({ quantity, productQuantity }: Props) => {
	return (
		<div className='changeQuantity'>
			<button className='changeQuantity__minus' disabled={quantity === 1}>
				-
			</button>
			<p className='changeQuantity__quantity'>{quantity}</p>
			<button
				className='changeQuantity__plus'
				disabled={quantity === productQuantity}
			>
				+
			</button>
		</div>
	)
}
