DROP TABLE IF EXISTS dogs;

CREATE TABLE dogs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL, 
    breed VARCHAR(20) NOT NULL,
    age INTEGER NOT NULL,
    is_reactive BOOLEAN NOT NULL

);