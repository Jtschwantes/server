const getEducations = async (req, res) => {
    try {
        const client = await res.locals.pool.connect()
        const result = await client.query('SELECT * FROM educations');
        const results = result.rows;
        res.send(results);
        client.release();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const getEducation = async (req, res) => {
    const id = req.params.id
    try {
        const client = await res.locals.pool.connect()
        const result = await client.query(`SELECT * FROM educations WHERE id = ${id}`);
        res.send(result.rows[0]);
        client.release();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const postEducation = async (req, res) => {
    let education = req.body

    let token = req.body.token;
    let aid = req.body.account_id;
    if(await !res.locals.verify(aid, token)) {
        res.status(403).send({status: "Forbidden"})
        return
    }
    try {
        const client = await res.locals.pool.connect()
        await client.query(`INSERT INTO educations(account_id, school, type, field, startDate, endDate, description) VALUES ('${education.account_id}', '${education.school}', '${education.type}', '${education.field}', '${education.startDate}', '${education.endDate}', '${education.description}')`);
        res.send({status: "success"})
        client.release();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const putEducation = async (req, res) => {
    const id = req.params.id;
    let education = req.body;
    
    let token = req.body.token;
    let aid = req.body.account_id;
    if(await !res.locals.verify(aid, token)) {
        res.status(403).send({status: "Forbidden"})
        return
    }
    
    try {
        const client = await res.locals.pool.connect()
        await client.query(`DELETE FROM educations WHERE id = ${id}`);
        await client.query(`INSERT INTO educations(id, account_id, school, type, field, startDate, endDate, description) VALUES ('${id}', '${education.account_id}', '${education.school}', '${education.type}', '${education.field}', '${education.startDate}', '${education.endDate}', '${education.description}')`);
        // const result = await client.query(`SELECT * FROM educations WHERE id = ${id}`);
        // const results = result.rows;
        // res.send(results);
        res.send({status: "success"})
        client.release();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const deleteEducation = async (req, res) => {
    const id = req.params.id;

    let token = req.body.token;
    let aid = req.body.account_id;
    if(await !res.locals.verify(aid, token)) {
        res.status(403).send({status: "Forbidden"})
        return
    }
    
    try {
        const client = await res.locals.pool.connect()
        await client.query(`DELETE FROM educations WHERE id = ${id}`);
        res.send({status: "success"})
        client.release();
    } catch (err) {
        console.error(err);
        res.send(err);
    }
}

exports.getEducation = getEducation
exports.getEducations = getEducations
exports.putEducation = putEducation
exports.postEducation = postEducation
exports.deleteEducation = deleteEducation