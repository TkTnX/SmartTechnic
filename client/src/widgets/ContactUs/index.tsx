import { Button, FormInput, FormTextarea } from '@/shared/components'

import './_contactUs.scss'

export const ContactUs = () => {
	return (
		<section className='contactUs'>
			<h2 className='contactUs__title'>Связаться с нами</h2>
			<form className='contactUs__form'>
				<div className='contactUs__left'>
					<FormInput
						inputClassName='contactUs__input'
						label='Имя'
						name='name'
						type='text'
					/>
					<FormInput
						inputClassName='contactUs__input'
						label='Телефон'
						name='phone'
						type='tel'
					/>
					<Button className='contactUs__button' text='Отправить' />
				</div>
				<div className='contactUs__right'>
					<FormTextarea
						className='contactUs__textarea'
						label='Сообщение'
						name='message'
					/>
					<label className='contactUs__checkbox'>
						<input type='checkbox' />
						<p>
							Отправляя данную форму вы соглашаетесь с политикой
							конфиденциальности
						</p>
					</label>
				</div>
			</form>
		</section>
	)
}
