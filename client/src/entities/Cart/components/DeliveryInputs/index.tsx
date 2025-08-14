import { DropdownInput, LabelInput } from '@/shared/components'
import { TIMES } from '@/shared/constants'
import { getDates } from '@/shared/helpers'

export const DeliveryInputs = () => {
	const now = new Date()
	const hours = now.getHours()
	return (
		<div className='deliveryInfo__inputs'>
			<DropdownInput
				label='Дата'
				name='date'
				items={getDates()}
				className='deliveryInfo__input'
			/>
			<LabelInput
				className='deliveryInfo__input'
				label='Улица, дом/корпус'
				name='street'
			/>
			<DropdownInput
				className='deliveryInfo__input'
				label='Время'
				name='time'
				items={TIMES.filter(
					time => Number(time.value.split('-')[0]) > hours
				)}
			/>
			<LabelInput
				className='deliveryInfo__input'
				label='Квартира'
				name='flat'
				type='number'
			/>
			<LabelInput
				className='deliveryInfo__input'
				label='Комментарий курьеру'
				name='comment'
			/>
		</div>
	)
}
