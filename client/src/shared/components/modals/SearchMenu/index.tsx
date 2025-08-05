import './_searchMenu.scss'

// TODO: Начать добавление бека

// TODO: В будущем создать уникальный компонент modal Для всех окон
type Props = {
	setOpen: (value: boolean) => void
}

export const SearchMenu = ({ setOpen }: Props) => {
	return (
		<>
			<div className='searchMenu'>
				<div className='searchMenu__top'>
					<h4 className='searchMenu__title'>Поиск</h4>
					<button onClick={() => setOpen(false)}>
						<img src='/images/icons/x.svg' alt='Закрыть' />
					</button>
				</div>
                <input
                    className='searchMenu__input'
					type='text'
					placeholder='Введите запрос, например «Smart balance»'
				/>
			</div>
			<div className='searchMenu__overlay' />
		</>
	)
}
