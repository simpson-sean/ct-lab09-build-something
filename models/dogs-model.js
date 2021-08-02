import pool from '../lib/utils/pool.js';

export default class dogs_model {
    id;
    name;
    breed;
    age;
    is_reactive;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.breed = row.breed;
        this.age = row.age;
        this.is_reactive = row.is_reactive;
    };

    static async insert({ name, breed, age, is_reactive }) {    
        const { rows } = await pool.query(
        'INSERT INTO dogs (name, breed, age, is_reactive) VALUES ($1, $2, $3, $4) RETURNING *',
        [ name, breed, age, is_reactive ]
     );

    return new dogs_model(rows[0]);
    }
}