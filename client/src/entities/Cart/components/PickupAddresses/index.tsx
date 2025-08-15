import { ADDRESSES } from '@/shared/constants'
import { useCartStore } from '@/shared/stores'

export const PickupAddresses = () => {
	const { setOrderInfo, orderInfo } = useCartStore()
	console.log(
		ADDRESSES.find(city => city.city === orderInfo.city),
		orderInfo.city
	)
	return (
		<div className='deliveryInfo__addresses'>
			{ADDRESSES.find(
				city => city.city === orderInfo.city
			)!.addresses.map(address => (
				<button
					onClick={() => setOrderInfo('street', address.label)}
					className={`deliveryInfo__type ${address.label === orderInfo.street ? 'active' : ''}`}
				>
					<div className='deliveryInfo__type-dot' />
					{address.label}
				</button>
			))}
		</div>
	)
}
