import { ApolloServer } from '@apollo/server'
import { readFileSync } from 'fs'
import { join } from 'path'
import { resolver as resolvers } from './Resolver'
import express, { Express, Request, Response } from 'express';
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { createServer, Server } from 'http'
import cors from 'cors';
import bodyParser from 'body-parser'
// MongoDB Connector
import { run } from './Mongo'
// Logging Plugin
import { loggingPlugin } from './Plugin';
import logger from './logger'

run()
  .then((res) => {
    logger.info("MongoDB Connection Success")
  })
  .catch((err) => {
    logger.error("Error while connecting to MongoDB")
    process.exit(1)
  })

const typeDefs = readFileSync(
  join(__dirname, '../typeDef.graphql'),
  'utf-8'
)

const resolver = {
  ...resolvers
}

const app: Express = express();
const httpServer: Server = createServer(app);

// Apollo Playground Server
const server = new ApolloServer({
  typeDefs,
  resolvers: resolver,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), loggingPlugin]
})

server.start()
  .then(res => {
    app.use(
      cors(),
      bodyParser.json(),
      expressMiddleware(server)
    )
    httpServer.listen(4000, '0.0.0.0', () => {
      logger.info(`🚀 Server listening at port 4000`)
    })
  })
  .catch(err => {
    logger.error((err as Error).message)
  })