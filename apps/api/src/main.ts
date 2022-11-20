import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as cors from 'cors';
import { shopRoutes, adminRoutes, octopusRoutes } from './app/routes';

const app = express();
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(bodyParser.json());
// bodyParser first, so it can be used in the routes

app.use('/octopus', octopusRoutes); // bodyParser ??
app.use('/admin', adminRoutes); //bodyparser.json
app.use('/shop', shopRoutes); //bodyParser.urlencoded({extended: false})
// order does not matter, since get looks for exact matches

app.get('/api', (req, res) => res.send({ message: 'Welcome to shop-back!' }));
app.get('/', (req, res) => res.status(302).redirect('/octopus'));

//anything else failed
app.use((req, res) => {
  res.status(404);
  const error_message = `${req.path} not a valid API path.`;
  res.status(404).send({ Error: error_message });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
