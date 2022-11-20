import { Router } from 'express';
import * as bodyParser from 'body-parser';
//import * as path from 'path'

export const shopRoutes = Router();

// just to see if it works:
shopRoutes.get('/', (req, res) =>
  res.send({ route: 'localhost:3333/shop - You are running <shop-back>!' })
);

shopRoutes.use(bodyParser.urlencoded({ extended: false }));

shopRoutes.get('/go', (req, res) => {
  // request should look like /go?ops=00:30;ope=04:30;opprice=0.12;pkprice=0.4435;file=consumption.csv
  const ops = req.body.ops;
  const ope = req.body.ope;
  const opp = req.body.opprice;
  const pkp = req.body.pkprice;
  const file = req.body.file;
  console.log(ops, ope, opp, pkp, file);
  // read a csv-file
  // convert it into json, mark offpeak
  // compact json to {date, opcons, opprice, pkcons, pkprice, cons, price}
  // put this in into a db
  // return the json
});
