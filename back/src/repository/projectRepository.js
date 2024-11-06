// find all projects
async function findAll(conn) {
  try {
    const query = 'SELECT * FROM project';
    const ret = await conn.query(query);
    return ret[0];
  } catch (sqlException) {
    throw new Error(sqlException);
  }
}
// find project by project id
async function findById(conn, id) {
  try {
    const param = [id];
    const query = 'SELECT * FROM project WHERE id=?';
    const ret = await conn.query(query, param);
    return ret[0];
  } catch (sqlException) {
    throw new Error(sqlException);
  }
}
// save project
async function save(conn, saveDto) {
  try {
    const param = [saveDto.title, saveDto.description];
    const query = 'INSERT INTO project(title, description) values(?, ?)';
    const result = await conn.query(query, param);
    return result;
  } catch (sqlException) {
    throw new Error(sqlException);
  }
}
// delete project by id
async function deleteById(conn, id) {
  try {
    const param = id;
    const query = 'DELETE FROM project WHERE id=?';
    const result = await conn.query(query, param);
    return result;
  } catch (sqlException) {
    throw new Error(sqlException);
  }
}
async function updateProject(conn, id, updateDto) {
  try {
    const param = Object.values(updateDto).concat([id]);
    const setProps = Object.keys(updateDto)
      .map((col) => `${col}=?`)
      .join(',');
    const query = `UPDATE project SET ${setProps} WHERE id=?`;
    const result = await conn.query(query, param);
    return result;
  } catch (sqlException) {
    throw new Error(sqlException);
  }
}
const projectRepository = { findAll, findById, save, deleteById, updateProject };
export default projectRepository;
