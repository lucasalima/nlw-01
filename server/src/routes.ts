import express from 'express';

// Utilizado para realizar upload de arquivos.
import multer from 'multer';
import multerConfig from './config/multer';

// Utilizado para validação do input de dados.
// Obs.: é interessante utilizar esta biblioteca
// pela capacidade de integração com o "express";
import { celebrate, Joi } from 'celebrate';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

/**
 * Padrão de nomenclatura para os métodos de requisição:
 * @index = Listagem (N)
 * @show = Listagem (1)
 * @create =  Criação
 * @update =  Atualização
 * @delete =  Exclusão
 */

routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

// Arquivo de configuração de upload separado por rota.
routes.post(
  '/points',
  upload.single('image'),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  pointsController.create
);

export default routes;
