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
        res.send(result.rows);
        client.release();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const postAccount = async (req, res) => {
    let account = req.body
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
    try {
        const client = await res.locals.pool.connect()
        await client.query(`DELETE FROM accounts WHERE id = ${id}`);
        await client.query(`INSERT INTO accounts(id, gid, first, last, imgLink, phone, email) VALUES (${id}, '${account.gid}', '${account.first}', '${account.last}', '${account.imgLink}', '${account.phone}', '${account.email}')`);
        // const result = await client.query(`SELECT * FROM accounts WHERE id = ${id}`);
        // const results = result.rows;
        // res.send(results);
        res.send({status: "success"})
        client.release();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const deleteAccount = async (req, res) => {
    const id = req.params.id;
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
exports.getAccounts = getAccounts
exports.putAccount = putAccount
exports.postAccount = postAccount
exports.deleteAccount = deleteAccount