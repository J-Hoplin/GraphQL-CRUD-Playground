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

export interface DeleteProductInput {
  id: string
}

// 요청이 넘어올때 serialize 과정에 의해 string으로 넘어온다
export interface UpdateProductInput extends ProductInput, DeleteProductInput { }

export interface InputRequest {
  input: object
}