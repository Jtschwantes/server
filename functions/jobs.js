const getJobs = async (req, res) => {
    try {
        const client = await res.locals.pool.connect()
        const result = await client.query('SELECT * FROM jobs');
        const results = result.rows;
        res.send(results);
        client.release();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const getJob = async (req, res) => {
    const id = req.params.id
    try {
        const client = await res.locals.pool.connect()
        const result = await client.query(`SELECT * FROM jobs WHERE id = ${id}`);
        res.send(result.rows[0]);
        client.release();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const postJob = async (req, res) => {
    let job = req.body

    let token = req.body.token;
    let aid = req.body.account_id;
    if(await !res.locals.verify(aid, token)) {
        res.status(403).send({status: "Forbidden"})
        return
    }
    try {
        const client = await res.locals.pool.connect()
        await client.query(`INSERT INTO jobs(account_id, title, employer, startDate, endDate, description) VALUES ('${job.account_id}', '${job.title}', '${job.employer}', '${job.startDate}', '${job.endDate}', '${job.description}')`);
        res.send({status: "success"})
        client.release();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const putJob = async (req, res) => {
    const id = req.params.id;
    let job = req.body;

    let token = req.body.token;
    let aid = req.body.account_id;
    if(await !res.locals.verify(aid, token)) {
        res.status(403).send({status: "Forbidden"})
        return
    }
    try {
        const client = await res.locals.pool.connect()
        await client.query(`DELETE FROM jobs WHERE id = ${id}`);
        await client.query(`INSERT INTO jobs(account_id, id, title, employer, startDate, endDate, description) VALUES ('${job.account_id}', ${id}, '${job.title}', '${job.employer}', '${job.startDate}', '${job.endDate}', '${job.description}')`);
        // const result = await client.query(`SELECT * FROM jobs WHERE id = ${id}`);
        // const results = result.rows;
        // res.send(results);
        res.send({status: "success"})
        client.release();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const deleteJob = async (req, res) => {
    const id = req.params.id;

    let token = req.body.token;
    let aid = req.body.account_id;
    if(await !res.locals.verify(aid, token)) {
        res.status(403).send({status: "Forbidden"})
        return
    }
    try {
        const client = await res.locals.pool.connect()
        await client.query(`DELETE FROM jobs WHERE id = ${id}`);
        res.send({status: "success"})
        client.release();
    } catch (err) {
        console.error(err);
        res.send(err);
    }
}

exports.getJob = getJob
exports.getJobs = getJobs
exports.putJob = putJob
exports.postJob = postJob
exports.deleteJob = deleteJob