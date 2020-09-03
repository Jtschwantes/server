const express = require('express')
const path = require('path')
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://yfyzdciabhwwbq:d3a9d00ce2cd06349f5ac0ce0139b6467aee5d3994881f85faa0ad5d35c7abac@ec2-52-72-34-184.compute-1.amazonaws.com:5432/daq4b6l917ll6r',
    ssl: true
});

const PORT = process.env.PORT || 5000


const app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
  .get('/', (req, res) => res.send('Hello World!'))
  .get('/projects', getProjects)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  async function getProjects(req, res) {
    try {
        const client = await pool.connect()
        const result = await client.query('SELECT * FROM projects');
        // const results = { 'results': (result) ? result.rows : null };
        const results = result.rows;
        //   res.render('pages/db', results );
        res.send(results);
        client.release();
    } catch (err) {
        console.error(err);
        throw err;
    }
}