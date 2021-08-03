import { Router } from 'express';
import Doggos from '../models/dogs-model.js';
import dogs_model from '../models/dogs-model.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const parker = await Doggos.insert(req.body);

      res.send(parker);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const parker = await dogs_model.getDogById(id);

      res.send(parker);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const allDoggos = await dogs_model.getAllDoggos();

      res.send(allDoggos);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, breed, age, is_reactive } = req.body;

      const updatedDoggo = await dogs_model.updateDoggoById(id, {
        name,
        breed,
        age,
        is_reactive,
      });

      res.send(updatedDoggo);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const dog = await dogs_model.deleteDogById(id);

      res.send({
        message: `${dog.name} of breed type ${dog.breed} has been removed.`,
      });
    } catch (err) {
      next(err);
    }
  });
