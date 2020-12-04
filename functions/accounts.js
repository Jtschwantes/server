const getAccounts = async (req, res) => {
    try {
        const client = await res.locals.pool.connect()
        const result = await client.query('SELECT * FROM accounts');
        const results = result.rows;
        res.send(results);
        client.release();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const getAccount = async (req, res) => {
    const id = req.params.id
    try {
        const client = await res.locals.pool.connect()
        const result = await client.query(`SELECT * FROM accounts WHERE id = ${id}`);
        res.send(result.rows[0]);
        client.release();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const getAccountData = async (req, res) => {
    const id = req.params.id
    try {
        const client = await res.locals.pool.connect()
        const account = await client.query(`SELECT * FROM accounts WHERE id = ${id}`);
        const educations = await client.query(`SELECT * FROM educations WHERE account_id = ${id}`);
        const jobs = await client.query(`SELECT * FROM jobs WHERE account_id = ${id}`);
        const skills = await client.query(`SELECT * FROM skills WHERE account_id = ${id}`);
        const projects = await client.query(`SELECT * FROM projects WHERE account_id = ${id}`);
        res.send({
            account: account.rows[0],
            educations: educations.rows,
            jobs: jobs.rows,
            skills: skills.rows,
            projects: projects.rows
        });
        client.release();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const postAccount = async (req, res) => {
    let account = req.body

    let token = req.body.token;
    let aid = req.body.account_id;
    if(await !res.locals.verify(aid, token)) {
        res.status(403).send({status: "Forbidden"})
        return
    }
    try {
        const client = await res.locals.pool.connect()
        await client.query(`INSERT INTO accounts(gid, first, last, imgLink, phone, email) VALUES ('${account.gid}', '${account.first}', '${account.last}', '${account.imgLink}', '${account.phone}', '${account.email}')`);
        res.send({status: "success"})
        client.release();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const putAccount = async (req, res) => {
    const id = req.params.id;
    let account = req.body;
    
    let token = req.body.token;
    let aid = req.body.account_id;
    if(await !res.locals.verify(aid, token)) {
        res.status(403).send({status: "Forbidden"})
        return
    }
    
    try {
        const client = await res.locals.pool.connect()
        await client.query(`DELETE FROM accounts WHERE id = ${id}`);
        await client.query(`INSERT INTO accounts(id, gid, first, last, imgLink, phone, email) VALUES (${id}, '${account.gid}', '${account.first}', '${account.last}', '${account.imgLink}', '${account.phone}', '${account.email}')`);
        res.send({status: "success"})
        client.release();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const deleteAccount = async (req, res) => {
    const id = req.params.id;
    
    let token = req.body.token;
    let aid = req.body.account_id;
    if(await !res.locals.verify(aid, token)) {
        res.status(403).send({status: "Forbidden"})
        return
    }
    try {
        const client = await res.locals.pool.connect()
        await client.query(`DELETE FROM accounts WHERE id = ${id}`);
        res.send({status: "success"})
        client.release();
    } catch (err) {
        console.error(err);
        res.send(err);
    }
}

exports.getAccount = getAccount
exports.getAccountData = getAccountData
exports.getAccounts = getAccounts
exports.putAccount = putAccount
exports.postAccount = postAccount
exports.deleteAccount = deleteAccount