import { ApolloServer } from '@apollo/server'
import { readFileSync } from 'fs'
import { join } from 'path'
import { startStandaloneServer } from '@apollo/server/standalone'
import { resolver as resolvers } from './Resolver'

const typeDefs = readFileSync(
  join(__dirname, '../typeDef.graphql'),
  'utf-8'
)

const resolver = {
  ...resolvers
}

const server = new ApolloServer({
  typeDefs,
  resolvers: resolver
})


startStandaloneServer(server)
  .then(res => {
    const { url } = res;
    console.log(`🚀 Server listening at: ${url}`)
  })
  .catch(err => {
    console.error(err);
  })