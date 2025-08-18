import type { OrderStatuses } from '@/shared/types'

export function getOrderStatus(status: OrderStatuses) {
	switch (status) {
		case 'PENDING':
            return {
                label: 'В обработке',
                color: "#4878a6" 
            }
		case 'CONFIRMED':
            return {
                label: 'Подтвержден',
                color: "#22a44e"
            }
        case 'DELIVERED':
            return {
                label: 'Доставлен',
                color: "#ffaa00"
            }
        case 'CANCELED':
            return {
                label: 'Отменен',
                color: "#f15152"
            }
	}
}
