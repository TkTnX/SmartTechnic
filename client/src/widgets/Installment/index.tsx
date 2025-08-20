import './_installment.scss'
import { MakeInstallment } from './components/MakeInstallment'

export const Installment = () => {
	return (
		<section className='installment'>
			<h1 className='installment__title'>Рассрочка 0|0|18</h1>
			<img
				className='installment__image'
				src='/images/installment/promo.jpg'
				alt='Promo'
			/>

			<div className='installment__howItWorks'>
				<h2 className='installment__subtitle'>
					Как работает рассрочка
				</h2>
				<p className='installment__text'>
					ТЕПЕРЬ КАРТУ ХАЛВА МОЖНО ОФОРМИТЬ В СЕТИ НАШИХ МАГАЗИНОВ
					СОВЕРШЕННО БЕСПЛАТНО. Это займёт не более 10 минут. С собой
					необходимо иметь лишь паспорт.
				</p>
				<p className='installment__text'>
					С картой «Халва» сотрудничают более 200 000 партнёров от
					продуктовых магазинов до компаний продающих крупную бытовую
					технику и даже мебель, у которых покупки можно делать в
					бесплатную рассрочку. Сумма каждой такой покупки делится на
					равные части (по количеству месяцев рассрочки у партнёра).
					Раз в месяц «части» по всем покупкам суммируются и
					выставляются единым Платежом по рассрочке (дата выставления
					платежа равна дате оформления карты).
				</p>
				<p className='installment__highlight'>
					Проценты по вашей рассрочке за покупку в нашем магазине
					платит за вас НАШ МАГАЗИН
				</p>

				<img
					className='installment__image'
					src='/images/installment/howItWorks.jpg'
					alt='howItWorks'
				/>
				<p className='installment__text--sm'>
					Подключите подписку "Халва Десятка" и делайте любые покупки
					у партнеров с единым увеличенным сроком рассрочки 10
					месяцев. Можно расширить срок до 18-ти месяцев.
				</p>
			</div>

			<MakeInstallment />
		</section>
	)
}
