import connection from "../config/connection.js";
import { ProjectResponseDto } from "../dto/project/projectResponseDto.js";
import { ProjectUpdateDto } from "../dto/project/projectUpdateDto.js";
import projectRepository from "../repository/projectRepository.js";
import taskRepository from "../repository/taskRepository.js";
import { transactionManager } from "../util/transactionManager.js";
// transaction : save task
async function save(saveDto) {
  const saveAndGet = async (conn, dto) => {
    const insertInfo = await taskRepository.save(conn, dto);
    const projects = await projectRepository.findById(conn, dto.pjId);
    if (!insertInfo || !projects[0]) return undefined;
    const project = new ProjectResponseDto(projects[0]);
    const insertId = parseInt(insertInfo[0].insertId);
    await projectRepository.updateProject(
      conn,
      project.id,
      new ProjectUpdateDto(undefined, undefined, JSON.stringify(project.tasks.concat([insertId])))
    );
    const insertedTask = await taskRepository.findById(conn, insertId);
    return insertedTask[0];
  };
  const result = await transactionManager(connection, saveAndGet, [saveDto]);
  return result;
}
// not transaction : find all tasks by project id
async function findAllByPjId(pjId) {
  const result = await taskRepository.findByPjId(connection, pjId);
  return result;
}
// transaction : update task by task id
async function updateTask(pjId, taskId, updateDto) {
  const updateAndGet = async (conn, pid, tid, dto) => {
    await taskRepository.update(conn, pid, tid, dto);
    const updatedTask = await taskRepository.findByTaskAndPj(conn, pid, taskId);
    if (updatedTask.length === 0) return null;
    else return updatedTask[0];
  };
  const result = await transactionManager(connection, updateAndGet, [pjId, taskId, updateDto]);
  return result;
}
// transaction : delete task by task id
async function deleteById(pjId, taskId) {
  const deleteAndUpdate = async (conn, pid, tid) => {
    const deleteResult = await taskRepository.deleteById(conn, pid, tid);
    const projects = await projectRepository.findById(conn, pid);
    if (deleteResult.affectedRows > 0 && projects.length > 0) {
      const project = new ProjectResponseDto(projects[0]);
      project.tasks = project.tasks.filter((i) => i !== tid);
      await projectRepository.updateProject(
        conn,
        pid,
        new ProjectUpdateDto(project.title, project.description, JSON.stringify(project.tasks))
      );
    }
    return deleteResult.affectedRows;
  };
  const result = await transactionManager(connection, deleteAndUpdate, [pjId, taskId]);
  return result;
}
const taskService = { save, findAllByPjId, updateTask, deleteById };
export default taskService;
