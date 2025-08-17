import { create } from 'zustand';



import type { DeliveryTypes, PaymentTypes } from '@/shared/types';





export type CartStoreType = {
	orderInfo: {
		deliveryType: DeliveryTypes
		city: string | null
		deliveryDate?: string
		deliveryTime?: string
		street: string | null
		deliveryFlat?: string
		comment?: string,
		index?: string | null
		paymentType: PaymentTypes

		username: null | string
		userPhone: null | string
		userEmail: null | string
	}

	setOrderInfo: (
		key: keyof CartStoreType['orderInfo'],
		value: CartStoreType['orderInfo'][keyof CartStoreType['orderInfo']]
	) => void

	setManyOrderInfo: (values: Partial<CartStoreType['orderInfo']>) => void
}

export const useCartStore = create<CartStoreType>(set => ({
	orderInfo: {
		deliveryType: "DELIVERY",
		city: 'Санкт-Петербург',
		street: null,
		paymentType: 'CARD',
		index: null,

		username: null,
		userPhone: null,
		userEmail: null
	},
	setOrderInfo: (key, value) =>
		set(state => ({ orderInfo: { ...state.orderInfo, [key]: value } })),

	setManyOrderInfo: (values) => set(state => ({ orderInfo: { ...state.orderInfo, ...values } }))
}))