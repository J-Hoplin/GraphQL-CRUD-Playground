import { Schema, model, connect, Types } from 'mongoose'
import { Manager as IManager, Product, productType, sexType } from '../../type'
import { productSchema } from './product.schema'

const managerSchema = new Schema<IManager>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  sex: { type: String, enum: ["Male", "Female"], required: true }
})

export const Manager = model<IManager>('Manager', managerSchema)