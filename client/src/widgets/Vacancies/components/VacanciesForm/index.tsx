import { Button, FormInput, FormTextarea } from '@/shared/components'

import './_vacanciesForm.scss'

export const VacanciesForm = () => {
	return (
		<div className='vacanciesForm'>
			<h2 className='vacanciesForm__title'>Присоединяйся к команде</h2>
			<form className='vacanciesForm__form'>
				<FormInput name='name' label='Имя' />
				<FormInput name='lastname' label='Фамилия' />
				<FormInput name='patronymic' label='Отчество' />
				<FormInput name='phone' type='tel' label='Телефон' />
				<FormInput
					name='resume'
					type='file'
					label='Добавьте файл резюме'
				/>
				<FormTextarea name='message' label='Сопроводительное письмо' />
				<Button className='vacanciesForm__button' text='Отправить' />
				<div className='vacanciesForm__checkbox'>
					<input type='checkbox' />
					<p>
						Отправляя данную форму вы соглашаетесь с
						<span> политикой конфиденциальности</span>
					</p>
				</div>
			</form>
			<div className='vacanciesForm__phone'>
				<h6 className='vacanciesForm__phone-title'>
					Номер отдела кадров
				</h6>
				<a href='tel:89960670096'>+7 (996) 067-00-96</a>
			</div>
		</div>
	)
}
