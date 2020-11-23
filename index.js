const express = require('express')
const bp = require('body-parser')
const path = require('path')
const projects = require('./functions/projects')
const educations = require('./functions/educations')
const jobs = require('./functions/jobs')
const skills = require('./functions/skills')
const cors = require('cors')
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://yfyzdciabhwwbq:d3a9d00ce2cd06349f5ac0ce0139b6467aee5d3994881f85faa0ad5d35c7abac@ec2-52-72-34-184.compute-1.amazonaws.com:5432/daq4b6l917ll6r',
    ssl: { rejectUnauthorized: false }
});

const PORT = process.env.PORT || 5000

// Server
const app = express()
    // Set Up options
    .use(express.static(path.join(__dirname, 'public')))
    .use(bp.json())
    .use(cors())
    .use((req, res, next) => {
        res.locals.pool = pool
        next()
    })
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    // Project services
    .get('/projects', projects.getProjects)
    .get('/projects/:id', projects.getProject)
    .post('/projects', projects.postProject)
    .put('/projects/:id', projects.putProject)
    .delete('/projects/:id', projects.deleteProject)
    // Educations services
    .get('/educations', educations.getEducations)
    .get('/educations/:id', educations.getEducation)
    .post('/educations', educations.postEducation)
    .put('/educations/:id', educations.putEducation)
    .delete('/educations/:id', educations.deleteEducation)
    // Job services
    .get('/jobs', jobs.getJobs)
    .get('/jobs/:id', jobs.getJob)
    .post('/jobs', jobs.postJob)
    .put('/jobs/:id', jobs.putJob)
    .delete('/jobs/:id', jobs.deleteJob)
    // Job services
    .get('/skills', skills.getSkills)
    .get('/skills/:id', skills.getSkill)
    .post('/skills', skills.postSkill)
    .put('/skills/:id', skills.putSkill)
    .delete('/skills/:id', skills.deleteSkill)

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
