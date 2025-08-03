/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import 'swiper/css'
// @ts-ignore
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import './_hero.scss'

export const Hero = () => {
	return (
		<section className='hero'>
			<Swiper
				spaceBetween={20}
				modules={[Pagination, Autoplay]}
				pagination={{ clickable: true }}
				autoplay={{ delay: 3000 }}
				className='hero__slider'
			>
				<SwiperSlide>
					<img src='/images/slider/1.jpg' alt='TEMP Slider image' />
				</SwiperSlide>
				<SwiperSlide>
					<img src='/images/slider/1.jpg' alt='TEMP Slider image' />
				</SwiperSlide>
				<SwiperSlide>
					<img src='/images/slider/1.jpg' alt='TEMP Slider image' />
				</SwiperSlide>
				<SwiperSlide>
					<img src='/images/slider/1.jpg' alt='TEMP Slider image' />
				</SwiperSlide>
				<SwiperSlide>
					<img src='/images/slider/1.jpg' alt='TEMP Slider image' />
				</SwiperSlide>
			</Swiper>
		</section>
	)
}
