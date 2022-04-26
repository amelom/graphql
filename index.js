'use strict'

require('dotenv').config()
const{ makeExecutableSchema} = require('@graphql-tools/schema')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')


const app = express()
const port = process.env.port || 3000

// definiendo el esquema
// const schema = buildSchema(
//     readFileSync(
//       join(__dirname, 'lib', 'schema.graphql'),
//       'utf-8'
//     )
//   )

const typeDefs = readFileSync(
    join(__dirname, 'lib', 'schema.graphql'),
    'utf-8'
  )
  const schema = makeExecutableSchema({ typeDefs, resolvers })

// Configurar los resolvers
// const resolvers = {
//   hello: () => {
//     return 'Hola Mundo'
//   },
//   saludo: () => {
//     return 'Hola a todos'
//   }
// }

// Ejecutar el query hello
// graphql({
//     schema: schema,
//     source: '{ hello }',
//     rootValue: resolvers
// }).then((data) => {
//     console.log(data);
// })
// .catch(e => {
//     console.log(e);
// });

app.use('/api', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
  }))
  
  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}/api`);
  })