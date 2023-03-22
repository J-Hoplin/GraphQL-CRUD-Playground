import { Product, queryInput, InputRequest, ProductInput, UpdateProductInput, DeleteProductInput } from '../type'

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
      return result
    }
  },
  Mutation: {
    addProduct: async (parent: any, { input }: InputRequest) => {
      try {
        const id = list.length === 0 ? 1 : list[list.length - 1].id + 1;
        list.push({
          id,
          ...input as ProductInput
        })
        return true
      } catch (err) {
        return false
      }
    },
    updateProduct: async (parent: any, { input }: InputRequest) => {
      try {
        let searchSuccess = false;
        const updateValues = input as UpdateProductInput
        list.map((product: Product) => {
          if (product.id === parseInt(updateValues.id, 10)) {
            searchSuccess = true;
            product.description = updateValues.description
            product.name = updateValues.name
            product.price = updateValues.price
          }
        })
        return searchSuccess
      } catch (err) {
        return false
      }
    },
    deleteProduct: async (parent: any, { input }: InputRequest) => {
      try {
        const deleteValues = input as DeleteProductInput
        const index = list.findIndex((product: Product) => {
          return product.id === parseInt(deleteValues.id, 10)
        })
        // If fail to Search
        if (index === -1) {
          return false
        }
        list.splice(index, 1)
        return true
      } catch (err) {
        return false
      }

    }
  }
}