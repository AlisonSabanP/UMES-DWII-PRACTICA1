import express from 'express';
import routes from './routes/index.route.js';

const app = express();
const port = 3001;
app.use(express.json());

app.use("/",routes);

app.listen(port, () => console.log('Servidor iniciado'));