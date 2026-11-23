const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

app.get('/', (req, res) => res.send('Hola desde Docker'));

app.get('/health', (req, res) => res.send('ok'));

app.get('/db', async (req, res) => {
  try {
    const c = await mysql.createConnection({
      host: 'db', user: 'root', password: 'root', database: 'test'
    });
    await c.query('SELECT 1');
    await c.end();
    res.send('db ok');
  } catch (e) {
    res.status(500).send('db error');
  }
});

app.listen(3000, () => console.log('corriendo en 3000'));

