// save task
async function save(conn, saveDto) {
  const query = 'INSERT INTO task(pjId, title, description, priority, dueDate, status) values(?, ?, ?, ?, ?, ?)';
  const param = Object.values(saveDto);
  const result = await conn.query(query, param);
  return result;
}
// find project by project id
async function findByPjId(conn, pjId) {
  const query = 'SELECT * FROM task WHERE pjId=?';
  const param = [pjId];
  const result = await conn.query(query, param);
  return result[0];
}
// find project by task id
async function findById(conn, id) {
  const query = 'SELECT * FROM task WHERE id=?';
  const param = [id];
  const result = await conn.query(query, param);
  return result[0];
}
// update task
async function update(conn, pjId, taskId, updateDto) {
  const param = Object.values(updateDto).concat([taskId, pjId]);
  const props = Object.keys(updateDto)
    .map((p) => `${p}=?`)
    .join(',');
  const query = `UPDATE task SET ${props} WHERE id=? AND pjId=?`;
  const result = await conn.query(query, param);
  return result[0];
}
// delete task by task id
async function deleteById(conn, pjId, taskId) {
  const param = [taskId, pjId];
  const query = 'DELETE FROM task WHERE id=? AND pjId=?';
  const result = await conn.query(query, param);
  return result[0];
}
const taskRepository = { save, findByPjId, findById, update, deleteById };
export default taskRepository;
