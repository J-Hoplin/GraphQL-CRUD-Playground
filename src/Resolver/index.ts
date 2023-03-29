import { ManagerInput, ProductInput, InputType, GetWithID, LiteralInput, UpdateInputType, DeleteInputType, Product, Manager, MutationResponse, UpdateProductInput, UpdateManagerInput, DeleteProductInput, DeleteManagerInput } from '../type'
import { Manager as ManagerDB, Product as ProductDB } from '../Mongo'
import { v4 } from 'uuid'

const successMessage: string = "OK"

export const resolver = {
  Product: {
    discountedPrice: async (parent: Product, variable: GetWithID) => {
      const {
        rate
      } = variable
      const discounted = (parent.price) * (1 - (rate / 100))
      return discounted
    },
    managerInfo: async (parent: Product, variable: LiteralInput) => {
      const { managerid } = parent
      return await ManagerDB.findOne({
        id: managerid
      })
    }
  },
  Manager: {
    managingProducts: async (parent: Manager, variable: LiteralInput) => {
      const { id } = parent
      const lists = await ProductDB.find({})
      const filtered = lists.filter(x => {
        return x.managerid === id
      })
      return filtered
    },
    checkMyProduct: async (parent: Manager, variable: GetWithID) => {
      const { id: managerID } = parent
      const { id } = variable
      const getProduct = await ProductDB.findOne({
        id
      })
      if (getProduct?.managerid !== managerID) {
        throw new Error("Invalid approach")
      }
      return getProduct
    }
  },
  Query: {
    getProduct: async (parent: any, variable: GetWithID) => {
      const { id } = variable
      return await ProductDB.find({
        id
      })
    },
    getManager: async (parent: any, variable: GetWithID) => {
      const { id } = variable
      return await ManagerDB.find({
        id
      })
    },
    getAllProduct: async (parent: any, variable: LiteralInput) => {
      return await ProductDB.find({})
    },
    getAllManagers: async (parent: any, variable: LiteralInput) => {
      return await ManagerDB.find({})
    }
  },
  Mutation: {
    addManager: async (parent: any, { input }: InputType): Promise<MutationResponse> => {
      try {
        const {
          name,
          age,
          sex
        } = input as ManagerInput
        const managerID = v4()
        await ManagerDB.create({
          id: managerID,
          name,
          age,
          sex
        })
        return {
          success: true,
          message: managerID
        }
      } catch (err) {
        const error = err as Error
        return {
          success: false,
          message: error.message
        }
      }
    },
    addProduct: async (parent: any, { input }: InputType): Promise<MutationResponse> => {
      try {
        const {
          type,
          name,
          price,
          description,
          managerid
        } = input as ProductInput
        const productID = v4()
        await ProductDB.create({
          id: productID,
          type,
          name,
          price,
          description,
          managerid
        })
        return {
          success: true,
          message: productID
        };
      } catch (err) {
        const error = err as Error
        return {
          success: false,
          message: error.message
        }
      }
    },
    updateProduct: async (parent: any, { update }: UpdateInputType): Promise<MutationResponse> => {
      try {
        const {
          id,
          type: changedType,
          name: changedName,
          description: changedDescription,
          managerid: changedMangerID
        } = update as UpdateProductInput
        const findProduct = await ProductDB.findOne({
          id
        });
        if (!findProduct) {
          throw new Error(`Product with ID ${id} not found`)
        }
        await ProductDB.updateOne({
          id
        }, {
          $set: {
            type: changedType || findProduct.type,
            name: changedName || findProduct.name,
            description: changedDescription || findProduct.description,
            managerid: changedMangerID || findProduct.managerid
          }
        })
        return {
          success: true,
          message: successMessage
        }
      } catch (err) {
        const error = err as Error
        return {
          success: false,
          message: error.message
        }
      }
    },
    updateManager: async (parent: any, { update }: UpdateInputType): Promise<MutationResponse> => {
      try {
        const {
          id,
          name: changedName,
          age: changedAge,
          sex: chagedSex
        } = update as UpdateManagerInput
        const findManager = await ManagerDB.findOne({
          id
        });
        if (!findManager) {
          throw new Error(`Manager with ID ${id} not found`)
        }
        await ManagerDB.updateOne({
          id
        }, {
          $set: {
            name: changedName || findManager.name,
            age: changedAge || findManager.age,
            sex: chagedSex || findManager.sex
          }
        })
        return {
          success: true,
          message: successMessage
        }

      } catch (err) {
        const error = err as Error
        return {
          success: false,
          message: error.message
        }
      }
    },
    deleteProduct: async (parent: any, { del }: DeleteInputType): Promise<MutationResponse> => {
      try {
        const {
          id
        } = del as DeleteProductInput
        const findProduct = await ProductDB.findOne({
          id
        })
        if (!findProduct) {
          throw new Error(`Product with ID ${id} not found`)
        }
        await ProductDB.deleteOne({
          id
        })
        return {
          success: true,
          message: successMessage
        }
      } catch (err) {
        const error = err as Error
        return {
          success: false,
          message: error.message
        }
      }
    },
    deleteManager: async (parent: any, { del }: DeleteInputType): Promise<MutationResponse> => {
      try {
        const {
          id
        } = del as DeleteManagerInput
        const findManager = await ManagerDB.findOne({
          id
        })
        if (!findManager) {
          throw new Error(`Manager with ID ${id} not found`)
        }
        const findManagerProduct = await ProductDB.find({
          managerid: id
        })
        if (findManagerProduct.length) {
          throw new Error(`Please check if manager's managing products has been transition to other manager!`)
        }

        await ManagerDB.deleteOne({
          id
        })
        return {
          success: true,
          message: successMessage
        }
      } catch (err) {
        const error = err as Error
        return {
          success: false,
          message: error.message
        }
      }
    },
  }
}