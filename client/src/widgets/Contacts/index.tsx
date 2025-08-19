import { Clock9, Mail } from 'lucide-react'

import { CONTACTS } from '@/shared/constants'

import './_contacts.scss'

export const Contacts = () => {
	return (
		<section className='contacts'>
			<h1 className='contacts__title'>Контакты</h1>
			<div className='contacts__wrapper'>
				<div className='contacts__list'>
					{CONTACTS.map((contact, index) => (
						<a
							href={'tel:' + contact.phone}
							className='contacts__item'
							key={index}
						>
							<span className='contacts__item-address'>
								{contact.address}
							</span>
							<span className='contacts__item-phone'>
								{contact.phone}
							</span>
						</a>
					))}
					<div className='contacts__more'>
						<div className='contacts__mail'>
							<Mail size={24} color='#2A5275' />
							<a href='mailto:smart-tekhnika@gmail.com'>
								smart-tekhnika@gmail.com
							</a>
						</div>
						<div className='contacts__time'>
							<Clock9 size={24} color='#2A5275' />
							<div className='contacts__time-info'>
								<p className='contacts__time-title'>
									Режим работы
								</p>
								<h6 className='contacts__time-text'>
									Пн-вс с 10:00 до 21:00
								</h6>
							</div>
						</div>
					</div>
				</div>
				<div className='contacts__map'>
					<img src='/images/contacts/map.jpg' alt='Карта' />
				</div>
			</div>
		</section>
	)
}
