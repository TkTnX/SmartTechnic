import type { ICategory, IReview } from '.'

export interface IProduct {
	id: string
	name: string
	price: number
	oldPrice?: number
	brand: string
	description: string
	status: string
	quantity: number
	images: string[]
	rating: number 
	categoryId: string
	category: ICategory
    reviews: IReview[]
    
    createdAt: string
}
