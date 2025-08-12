
type Props = {
    oldPrice?: number,
    price: number
}

export const ProductPrice = ({ oldPrice, price }: Props) => {
	return (
		<div className='product__info-price'>
			{oldPrice && (
				<p className='product__oldPrice'>{oldPrice}₽</p>
			)}
			<p className='product__price'>{price}₽</p>
			{oldPrice && (
				<p className='product__difference'>
					-{oldPrice - price}₽
				</p>
			)}
		</div>
	)
}
