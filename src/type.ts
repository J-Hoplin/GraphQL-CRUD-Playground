export interface Product {
  id: number
  name: string
  price: number
  description?: string
}

export interface queryInput {
  id: string
  [key: string]: any
}

export interface ProductInput {
  name: string
  price: number
  description?: string
}

export interface InputRequest {
  input: ProductInput
}
