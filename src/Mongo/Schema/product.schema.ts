import { Schema, model, connect, Types } from 'mongoose'
import { productType, Product as IProduct } from '../../type';

export const productSchema = new Schema<IProduct>({
  id: { type: String, required: true },
  type: { type: String, enum: ["GADGET", "FOOD", "SOFTWARE", "ETC"], required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  managerid: { type: String, required: true }
})

export const Product = model<IProduct>('Product', productSchema);