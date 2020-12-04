const getSkills = async (req, res) => {
    try {
        const client = await res.locals.pool.connect()
        const result = await client.query('SELECT * FROM skills');
        const results = result.rows;
        res.send(results);
        client.release();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const getSkill = async (req, res) => {
    const id = req.params.id
    try {
        const client = await res.locals.pool.connect()
        const result = await client.query(`SELECT * FROM skills WHERE id = ${id}`);
        res.send(result.rows[0]);
        client.release();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const postSkill = async (req, res) => {
    let skill = req.body
    try {
        const client = await res.locals.pool.connect()
        await client.query(`INSERT INTO skills(account_id, description) VALUES ('${skill.account_id}', '${skill.description}')`);
        res.send({status: "success"})
        client.release();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const putSkill = async (req, res) => {
    const id = req.params.id;
    let skill = req.body;
    try {
        const client = await res.locals.pool.connect()
        await client.query(`DELETE FROM skills WHERE id = ${id}`);
        await client.query(`INSERT INTO skills(id, account_id, description) VALUES (${id}, '${skill.account_id}', '${skill.description}')`);
        // const result = await client.query(`SELECT * FROM skills WHERE id = ${id}`);
        // const results = result.rows;
        // res.send(results);
        res.send({status: "success"})
        client.release();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const deleteSkill = async (req, res) => {
    const id = req.params.id;
    try {
        const client = await res.locals.pool.connect()
        await client.query(`DELETE FROM skills WHERE id = ${id}`);
        res.send({status: "success"})
        client.release();
    } catch (err) {
        console.error(err);
        res.send(err);
    }
}

exports.getSkill = getSkill
exports.getSkills = getSkills
exports.putSkill = putSkill
exports.postSkill = postSkill
exports.deleteSkill = deleteSkill