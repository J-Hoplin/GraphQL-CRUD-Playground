import { config } from 'winston'

export const enum productType {
  GADGET = "GADGET",
  FOOD = "FOOD",
  SOFTWARE = "SOFTWARE",
  ETC = "ETC"
}

export const enum sexType {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

export interface Manager {
  id: string
  name: string
  age: number
  sex: sexType
}

export interface Product {
  id: string
  type: productType
  name: string
  price: number
  description: string
  managerid: String
}

// Literal input types
export interface LiteralInput {
  [key: string]: any
}

export interface GetWithID extends LiteralInput {
  id: String
}


export interface MutationResponse {
  success: Boolean
  message: string
}

// Input types
export interface ProductInput {
  type: productType
  name: string
  price: number
  description: string
  managerid: string
}

export interface ManagerInput {
  name: string
  age: number
  sex: sexType
}


export interface DeleteManagerInput {
  id: string
}

export interface DeleteProductInput {
  id: string
}

export type InputType = {
  input: ManagerInput | ProductInput
}

// 요청이 넘어올때 serialize 과정에 의해 string으로 넘어온다
export interface UpdateProductInput extends ProductInput, DeleteProductInput { }

export interface UpdateManagerInput extends ManagerInput, DeleteManagerInput { }

export type UpdateInputType = {
  update: UpdateManagerInput | UpdateProductInput
}

export type DeleteInputType = {
  del: DeleteManagerInput | DeleteProductInput
}

export interface InputRequest {
  input: object
}

// Winston logger
export interface CustomOption {
  levels: config.AbstractConfigSetLevels,
  colors: config.AbstractConfigSetColors
}