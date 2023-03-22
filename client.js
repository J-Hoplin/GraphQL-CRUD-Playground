const axios = require('axios')
const { faker: fk } = require('@faker-js/faker')

async function addProduct() {
  const generatedObject = {
    price: fk.datatype.number(),
    name: fk.word.noun({ strategy: 'shortest' }),
    description: fk.lorem.lines(1),
  }
  try {
    const result = await axios.post('http://localhost:4000', {
      query: 'mutation addProduct($input: ProductInput) { addProduct(input: $input)}',
      variables: {
        input: generatedObject,
      },
      operationName: null,
    })
    console.log(result.data)
    return result.data
  } catch (err) {
    console.error(err)
  }
}

addProduct()
