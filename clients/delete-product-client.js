const axios = require('axios')
const { faker: fk } = require('@faker-js/faker')

async function deleteProduct(targetId) {
  try {
    const result = await axios.post('http://localhost:4000', {
      query: 'mutation deleteProduct($input: DeleteProductInput) { deleteProduct(input: $input)}',
      variables: {
        input: {
          id: targetId
        },
      },
      operationName: null,
    })
    console.log(result.data)
    return result.data
  } catch (err) {
    console.error(err)
  }
}

deleteProduct(process.argv[2] || 1)