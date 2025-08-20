import { FormInput } from '@/shared/components'

import './_makeInstallment.scss'

export const MakeInstallment = () => {
	return (
		<div className='makeInstallment'>
			<div className='makeInstallment__block'>
				<h5 className='makeInstallment__title'>Оформить РАССРОЧКУ</h5>
				<form className='makeInstallment__form'>
					<FormInput name='name' label='Имя' />
					<FormInput name='phone' type='tel' label='Номер телефона' />
					<button className='makeInstallment__button'>
						Отправить
					</button>
				</form>
			</div>
			<div className='makeInstallment__info'>
				<h5 className='makeInstallment__title'>
					Мобильное приложение «Совкомбанк – Халва»
				</h5>
				<p className='makeInstallment__text'>
					Мобильный банковский офис, который всегда с вами:
				</p>
				<ul className='makeInstallment__list'>
					<li className='makeInstallment__item'>
						контроль вашей карты «Халва»
					</li>
					<li className='makeInstallment__item'>
						наиболее востребованные банковские функции
					</li>
					<li className='makeInstallment__item'>
						круглосуточный чат с поддержкой
					</li>
				</ul>
			</div>
		</div>
	)
}
