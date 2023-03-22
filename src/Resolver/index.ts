import { Product, queryInput, InputRequest } from '../type'

const list: Product[] = []

export const resolver = {
  Query: {
    getAllProduct: (parent: any, args: queryInput) => {
      return list
    },
    getProduct: (parent: any, args: queryInput) => {
      const result = list.filter((product: Product) => {
        return product.id === parseInt(args.id, 10)
      })
      console.log(result)
      return result
    }
  },
  Mutation: {
    addProduct: async (parent: any, { input }: InputRequest) => {
      const id = list.length === 0 ? 1 : list[list.length - 1].id + 1;
      list.push({
        id,
        ...input
      })
      return id
    }
  }
}