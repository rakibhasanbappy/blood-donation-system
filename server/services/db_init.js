// This file will be run once when the server starts. It will connect to the database and create the tables if they don't exist. It will also seed the database with some initial data. This is a good place to put any code that needs to run once when the server starts up.

const { Client } = require("pg");
require("dotenv").config();

// create an enum type for blood_group
const createEnumTypeQuery = `
CREATE TYPE blood_group AS ENUM ('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-');`;


const createUsersTableQuery = `
CREATE TABLE IF NOT EXISTS users(
	uid SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
	password BYTEA NOT NULL,
	phone VARCHAR(15) NOT NULL CHECK (phone ~ '^\\+[0-9]{1,14}$'),
	district VARCHAR(100),
	divison VARCHAR(100),
	blood_group blood_group NOT NULL,
	is_available BOOLEAN DEFAULT TRUE,
	last_donated DATE
)`;


const createRequestsTableQuery = `
CREATE TABLE IF NOT EXISTS requests(
	request_id SERIAL PRIMARY KEY,
	request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	name VARCHAR(255) NOT NULL,
	phone VARCHAR(15) NOT NULL CHECK (phone ~ '^\\+[0-9]{1,14}$'),
	district VARCHAR(100),
	divison VARCHAR(100),
	address VARCHAR(255) NOT NULL,
	message VARCHAR(255),
	blood_group blood_group NOT NULL,
	views int,
	uid int,
	FOREIGN KEY (uid) REFERENCES users(uid)
)`;


async function initializeDB() {
  const client = new Client({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
    ssl: {
        rejectUnauthorized: false, // Only use this in dev or if needed in your config
    },
  });

  try {
    await client.connect();
    await client.query(createEnumTypeQuery);
    await client.query(createUsersTableQuery);
    await client.query(createRequestsTableQuery);
    console.log("Users table created or already exists.");
  } catch (err) {
    console.error("Error initializing database:", err);
  } finally {
    await client.end();
  }
}

initializeDB();

// module.exports = initializeDB;