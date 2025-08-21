import type { IProduct } from "@/shared/types/product.type"
import type { IUser } from "@/shared/types/user.type"

export interface ICompareItem {
    id: string
    productId: string
    userId: string

    product?: IProduct 
    user?: IUser
    
}