import type { ICategory, IProduct } from '.'

export interface ISpecification {
	id: string

	title: string
	value?: string

	product?: IProduct
	productId: string

	category?: ICategory
	categoryId: string
}

export interface IGroupedSpecifications {
    title: string
	categoryId: string
	category: ICategory
    values: SpecificationValue[]
}

export type SpecificationValue = { value: string; productId: string, quantity: number }