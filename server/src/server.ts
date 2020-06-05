import express from 'express';
import cors from 'cors';
import path from 'path';
import { errors } from 'celebrate';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

// Utilizado para servir arquivos estáticos (exemplo: imagem, PDF).
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

// Padronização no retorno de erros para o front-end.
app.use(errors());

app.listen(3333);
