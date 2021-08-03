import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import dogs_model from '../models/dogs-model.js';

// CRUD
// C - create  POST   --> INSERT
// R - read    GET    --> SELECT
// U - update  PUT    --> UPDATE
// D - delete  DELETE --> DELETE


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

  it('gets all the doggos', async () => {
    const parker = await dogs_model.insert({
      name: 'Parker',
      breed: 'Blue Healer',
      age: 3,
      is_reactive: true,
    })

    const tina = await dogs_model.insert({
      name: 'Tina',
      breed: 'Mixed Terrier',
      age: 12,
      is_reactive: false,
    })

    const matilda = await dogs_model.insert({
      name: 'Matilda',
      breed: 'Boston Terrier',
      age: 6,
      is_reactive: true,
    })

    return request(app)
      .get('/api/v1/doggos')
      .then((res) => {
        expect(res.body).toEqual([ parker, tina, matilda ]);
      })

  })

  it('updates a dog by ID', async () => {
    const dog = await dogs_model.insert({
      name: 'Parker',
      breed: 'Blue Healer',
      age: 3,
      is_reactive: true,
    })

    const res = await request(app)
      .put(`/api/v1/doggos/${dog.id}`)
      .send({ is_reactive: false })

      expect(res.body).toEqual({...dog, is_reactive: false })
  })


}); // <--- END OF PARENT CODE BLOCK
