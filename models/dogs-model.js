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

    static async getDogById(id) {
        const { rows } = await pool.query('SELECT * FROM dogs WHERE id=$1', [id]);

        return new dogs_model(rows[0]);
    }

    static async getAllDoggos() {
        const { rows } = await pool.query('SELECT * FROM dogs');

        return rows.map((row) => new dogs_model(row));
    }
}