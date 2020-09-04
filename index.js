const express = require('express')
const bp = require('body-parser')
const path = require('path')
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://yfyzdciabhwwbq:d3a9d00ce2cd06349f5ac0ce0139b6467aee5d3994881f85faa0ad5d35c7abac@ec2-52-72-34-184.compute-1.amazonaws.com:5432/daq4b6l917ll6r',
    ssl: { rejectUnauthorized: false }
});

const PORT = process.env.PORT || 5000

/////////////////// Project Services //////////////////////
const getProjects = async (req, res) => {
    try {
        const client = await pool.connect()
        const result = await client.query('SELECT * FROM projects');
        const results = result.rows;
        res.send(results);
        client.release();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const getProject = async (req, res) => {
    const id = req.params.id
    try {
        const client = await pool.connect()
        const result = await client.query(`SELECT * FROM projects WHERE id = ${id}`);
        const results = result.rows;
        res.send(results);
        client.release();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const postProject = async (req, res) => {
    let project = req.body
    try {
        const client = await pool.connect()
        await client.query(`INSERT INTO projects(name, date, summary, description, link, imgLink) VALUES ('${project.name}', ${project.date}, '${project.summary}', '${project.description}', '${project.link}', '${project.imgLink}')`);
        res.send(project);
        client.release();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const putProject = async (req, res) => {
    const id = req.params.id;
    let project = req.body;
    console.log(req.body);
    try {
        const client = await pool.connect()
        await client.query(`DELETE FROM projects WHERE id = ${id}`);
        await client.query(`INSERT INTO projects(id, name, date, summary, description, link, imgLink) VALUES ('${id}', '${project.name}', '${project.date}', '${project.summary}', '${project.description}', '${project.link}', '${project.imgLink}')`);
        const result = await client.query(`SELECT * FROM projects WHERE id = ${id}`);
        const results = result.rows;
        res.send(results);
        client.release();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const deleteProject = async (req, res) => {
    const id = req.params.id;
    try {
        const client = await pool.connect()
        const result = await client.query(`DELETE FROM projects WHERE id = ${id}`);
        res.send(result)
        client.release();
    } catch (err) {
        console.error(err);
        res.send(err);
    }
}

// Server
const app = express()
    // Set Up options
    .use(express.static(path.join(__dirname, 'public')))
    .use(bp.json())
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    // Project services
    .get('/projects', getProjects)
    .get('/projects/:id', getProject)
    .post('/projects', postProject)
    .put('/projects/:id', putProject)
    .delete('/projects/:id', deleteProject)

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
