import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import dogs_model from '../models/dogs-model.js';


describe('dog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('inserts dog into dogs table', async () => {
    const parker = { name: 'Parker', breed: 'Blue Healer', age: 3, is_reactive: true };
    const res = await request(app).post('/api/v1/doggos').send(parker);

    expect(res.body).toEqual({
      id: '1',
      ...parker,
    })
  })

  it('gets a doggo by id', async () => {
    const dog = await dogs_model.insert({
      name: 'Parker',
      breed: 'Blue Healer',
      age: 3,
      is_reactive: true,
    });

    const res = await request(app).get(`/api/v1/doggos/${dog.id}`);
    
    expect(res.body).toEqual(dog);
  })


}); // <--- END OF PARENT CODE BLOCK
