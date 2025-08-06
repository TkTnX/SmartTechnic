import { Link } from 'react-router-dom'

import { FOOTER_LINKS } from '@/shared/constants/footer.constants'

import './_footer.scss'
import FacebookIcon from './images/facebook.svg?react'
import InstagramIcon from './images/inst.svg?react'
import TwitterIcon from './images/twitter.svg?react'
import VkIcon from './images/vk.svg?react'

export const Footer = () => {
	return (
		<footer className='footer'>
			<div className='container footer__wrapper'>
				<div className='footer__top'>
					<div className='footer__main'>
						<Link to={'/'}>
							<img
								width={184}
								height={60}
								src='/images/logo.svg'
								alt='Лого'
							/>
						</Link>
						<div className='footer__socials'>
							<a href='tel:88126605054'>+7 (812) 660-50-54</a>
							<a href='tel:89581119503'>+7 (958) 111-95-03</a>
							<p className='footer__socials-time'>
								Пн-вс: с 10:00 до 21:00
							</p>
							<div className='footer__addresses'>
								<p className='footer__address'>
									Проспект Стачек 67 к.5
								</p>
								<p className='footer__address'>
									Лиговский проспект 205
								</p>
								<p className='footer__address'>
									Гражданский проспект, 116 к.5
								</p>
							</div>
						</div>
					</div>
					{FOOTER_LINKS.map(link => (
						<div key={link.title} className='footer__links'>
							<h6 className='footer__links-title'>
								{link.title}
							</h6>
							<div className='footer__links-list'>
								{link.items.map((item, index) => (
									<Link
										className='footer__links-item'
										to={item.link}
										key={index}
									>
										{item.title}
									</Link>
								))}
							</div>
						</div>
					))}
				</div>
				<div className='footer__bottom'>
					<p className='footer__copyright'>
						SmartТехника © 2025 Все права защищены
					</p>
					<div className='footer__socials'>
						<a href='#'>
							<TwitterIcon />
						</a>
						<a href='#'>
							<FacebookIcon />
						</a>
						<a href='#'>
							<VkIcon />
						</a>
						<a href='#'>
							<InstagramIcon />
						</a>
					</div>
					<p className='footer__developer'>
						Разработано <a href={'https://github.com/TkTnX'}>TTX</a>
					</p>
				</div>
			</div>
		</footer>
	)
}
