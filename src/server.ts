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
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
})

server.start()
  .then(res => {
    app.use(
      cors(),
      bodyParser.json(),
      expressMiddleware(server)
    )
    httpServer.listen(4000, '0.0.0.0', () => {
      console.log(`🚀 Server listening at port 4000`)
    })
  })
  .catch(err => {
    console.error(err)
  })