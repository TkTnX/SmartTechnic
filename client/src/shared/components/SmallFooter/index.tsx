import './_smallFooter.scss'

export const SmallFooter = () => {
	return (
		<footer className='container smallFooter'>
			<p className='footer__copyright'>
				SmartТехника © 2025 Все права защищены
			</p>
			<p className='footer__developer'>
				Разработано <a href={'https://github.com/TkTnX'}>TTX</a>
			</p>
		</footer>
	)
}
