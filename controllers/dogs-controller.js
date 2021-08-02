import { Router } from 'express';
import Doggos from '../models/dogs-model.js';
import dogs_model from '../models/dogs-model.js';

export default Router()
    .post('/', async (req, res, next) => {
        try {
            const parker = await Doggos.insert(req.body);

            res.send(parker);

        } catch(err) {
            next(err);
        }
    })