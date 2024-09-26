const { Client } = require('pg');
require('dotenv').config();

async function get_client() {
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
      console.log("Connected to database");
      return client;
    } catch (err) {
      console.log("Connection Error!", err);
      return null;
    }
  }
  
  module.exports = get_client;