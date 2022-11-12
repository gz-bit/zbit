import { Router } from 'express'
import * as bodyParser from 'body-parser'


//import * as path from 'path'
//import { viewPath } from './viewPath'

export const adminRoutes = Router()

// just to see if it works:
adminRoutes.get('/', (req, res) => res.send(
  { route: 'localhost:3333/admin - You are running <shop-back>!' }
))

adminRoutes.use(bodyParser.json())

adminRoutes.post('/post-product', (req, res) => {
  const product = req.body
  console.log(req.body)
  res.status(201).send(JSON.stringify(product))
})



