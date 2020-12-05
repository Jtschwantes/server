const express = require('express')
const bp = require('body-parser')
const path = require('path')
const projects = require('./functions/projects')
const educations = require('./functions/educations')
const jobs = require('./functions/jobs')
const skills = require('./functions/skills')
const accounts = require('./functions/accounts')
const cors = require('cors')
const { Pool } = require('pg')
const { OAuth2Client } = require('google-auth-library')

const PORT = process.env.PORT || 5000

const verifyToken = async(req, res) => {
    const token = req.body.token
    const id = req.body.account_id
    res.send({ status: "Success", isOwner: await res.locals.verify(id, token)})
}

// Server
const app = express()
    // Set Up options
    .use(express.static(path.join(__dirname, 'public')))
    .use(bp.json())
    .use(cors())
    .use((req, res, next) => {
        res.locals.pool = new Pool({
            connectionString: process.env.DATABASE_URL || 'postgres://yfyzdciabhwwbq:d3a9d00ce2cd06349f5ac0ce0139b6467aee5d3994881f85faa0ad5d35c7abac@ec2-52-72-34-184.compute-1.amazonaws.com:5432/daq4b6l917ll6r',
            ssl: { rejectUnauthorized: false }
        });
        res.locals.authent = new OAuth2Client(process.env.CLIENT_ID)
        res.locals.verify = async(id, token) => {
            if(!id || !token) return false
            let gid;
            let user;
            try {
                const client = await res.locals.pool.connect()
                const result = await client.query(`SELECT * FROM accounts WHERE id = ${id}`)
                gid = result.rows[0].gid
                client.release();
            } catch (err) {
                console.error(err);
                throw err;
            }
            try {
                const ticket = await res.locals.authent.verifyIdToken({
                    idToken: token,
                    audience: process.env.CLIENT_ID,
                })
                user = ticket.getPayload()['sub'];
            } catch (err) {
                console.error(err);
                throw err;
            }
            console.log(`Account ID: ${gid}, Google ID: ${user}, Evaluates to ${(user == gid)}`)
            return (user == gid)
        }
        next()
    })
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    // Account services
    .get('/accountData/:id', accounts.getAccountData)
    .get('/accounts', accounts.getAccounts)
    .get('/accounts/:id', accounts.getAccount)
    .post('/accounts', accounts.postAccount)
    .put('/accounts/:id', accounts.putAccount)
    .delete('/accounts/:id', accounts.deleteAccount)
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
    // Test Token
    .post('/verify', verifyToken)

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
