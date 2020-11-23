const getProjects = async (req, res) => {
    try {
        const client = await res.locals.pool.connect()
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
        const client = await res.locals.pool.connect()
        const result = await client.query(`SELECT * FROM projects WHERE id = ${id}`);
        res.send(result.rows);
        client.release();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const postProject = async (req, res) => {
    let project = req.body
    try {
        const client = await res.locals.pool.connect()
        await client.query(`INSERT INTO projects(account_id, name, date, summary, description, link, imgLink) VALUES ('${project.account_id}', '${project.name}', '${project.date}', '${project.summary}', '${project.description}', '${project.link}', '${project.imgLink}')`);
        res.send({status: "success"})
        client.release();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const putProject = async (req, res) => {
    const id = req.params.id;
    let project = req.body;
    try {
        const client = await res.locals.pool.connect()
        await client.query(`DELETE FROM projects WHERE id = ${id}`);
        await client.query(`INSERT INTO projects(account_id, id, name, date, summary, description, link, imgLink) VALUES ('${project.account_id}', ${id}, '${project.name}', '${project.date}', '${project.summary}', '${project.description}', '${project.link}', '${project.imgLink}')`);
        // const result = await client.query(`SELECT * FROM projects WHERE id = ${id}`);
        // const results = result.rows;
        // res.send(results);
        res.send({status: "success"})
        client.release();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
const deleteProject = async (req, res) => {
    const id = req.params.id;
    try {
        const client = await res.locals.pool.connect()
        await client.query(`DELETE FROM projects WHERE id = ${id}`);
        res.send({status: "success"})
        client.release();
    } catch (err) {
        console.error(err);
        res.send(err);
    }
}

exports.getProject = getProject
exports.getProjects = getProjects
exports.putProject = putProject
exports.postProject = postProject
exports.deleteProject = deleteProject