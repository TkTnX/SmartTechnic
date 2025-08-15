import { DropdownInput, LabelInput } from '@/shared/components'
import { TIMES } from '@/shared/constants'
import { getDates } from '@/shared/helpers'
import { useCartStore } from '@/shared/stores'

export const DeliveryInputs = () => {
	const { setOrderInfo, orderInfo } = useCartStore()
	const now = new Date()
	const day = now.getDate()
	const hours = now.getHours()

	const choosenDay = Number(orderInfo.deliveryDate?.split(' ')[1])
	const filteredTimes =
		choosenDay !== day
			? TIMES
			: TIMES.filter(time => Number(time.value.split('-')[0]) > hours)
	return (
		<div className='deliveryInfo__inputs'>
			<DropdownInput
				setOrderInfo={setOrderInfo}
				value={orderInfo.deliveryDate}
				label='Дата'
				name='deliveryDate'
				items={getDates()}
				className='deliveryInfo__input'
			/>
			<LabelInput
				setOrderInfo={setOrderInfo}
				className='deliveryInfo__input'
				label='Улица, дом/корпус'
				name='street'
			/>
			<DropdownInput
				setOrderInfo={setOrderInfo}
				className='deliveryInfo__input'
				label='Время'
				name='deliveryTime'
				items={filteredTimes}
			/>
			<LabelInput
				setOrderInfo={setOrderInfo}
				className='deliveryInfo__input'
				label='Квартира'
				name='deliveryFlat'
				type='number'
			/>
			<LabelInput
				setOrderInfo={setOrderInfo}
				className='deliveryInfo__input'
				label='Комментарий курьеру'
				name='comment'
			/>
		</div>
	)
}
