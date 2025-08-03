import './_search.scss'

export const Search = () => {
	return (
		<button className='search'>
			<img src='/images/icons/search.svg' alt='Поиск' />
			<p className='search__placeholder'>Поиск</p>
		</button>
	)
}
