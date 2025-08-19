import { FormInput } from '@/shared/components'
import './_contactUs.scss'

export const ContactUs = () => {
	return (
		<section className='contactUs'>
            <h2 className='contactUs__title'>Связаться с нами</h2>
            <form className='contactUs__form'>
                <FormInput label='Имя' name='name' type='text'  />
            </form>
		</section>
	)
}
