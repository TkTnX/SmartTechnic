import { Modal } from '@/shared/components/ui'

import './_searchMenu.scss'

type Props = {
	setOpen: (value: boolean) => void
	open: boolean
}

export const SearchMenu = ({ setOpen, open }: Props) => {
	return (
		<Modal title='Поиск' open={open} setOpen={setOpen} className='searchMenu'>
			<input
				className='searchMenu__input'
				type='text'
				placeholder='Введите запрос, например «Smart balance»'
			/>
		</Modal>
	)


}
