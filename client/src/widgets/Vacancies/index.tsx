import './_vacancies.scss'
import { VacanciesForm, VacanciesList } from './components'

export const Vacancies = () => {
	return (
		<section className='vacancies'>
			<h1 className='vacancies__title'>Вакансии </h1>
			<div className='vacancies__wrapper'>
				<VacanciesList />
				<VacanciesForm />
			</div>
		</section>
	)
}
