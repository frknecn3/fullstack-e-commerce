export interface categoryType {
    _id: number,
    name: string,
    slug: string,
    __v?: number
}

export interface productType {
    name: string,
    createdAt: string,
    description: string,
    category: string,
    price: number,
    quantity: number,
    shipping: boolean,
    slug: string,
    updatedAt: string
    __v: number,
    _id: string,
    amount: number
}