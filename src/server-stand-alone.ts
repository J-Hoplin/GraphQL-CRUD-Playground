import { ApolloServer } from '@apollo/server'
import { readFileSync } from 'fs'
import { join } from 'path'
import { startStandaloneServer } from '@apollo/server/standalone'
import { resolver as resolvers } from './Resolver'

// MongoDB Connector
import { run } from './Mongo'
import { loggingPlugin } from './Plugin';
import logger from './logger'

const typeDefs = readFileSync(
  join(__dirname, '../typeDef.graphql'),
  'utf-8'
)

const resolver = {
  ...resolvers
}

const server = new ApolloServer({
  typeDefs,
  resolvers: resolver,
  plugins: [loggingPlugin]
})


startStandaloneServer(server)
  .then(res => {
    const { url } = res;
    logger.info(`🚀 Server listening at: ${url}`)
  })
  .catch(err => {
    logger.error((err as Error).message)
  })