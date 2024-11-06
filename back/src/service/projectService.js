import connection from '../config/connection.js';
import projectRepository from '../repository/projectRepository.js';
import { transactionManager } from '../util/transactionManager.js';
import { ProjectResponseDto } from '../dto/project/projectResponseDto.js';

const repository = projectRepository;
// not transaction : find all project
async function findAll() {
  let projects = await repository.findAll(connection);
  if (projects) projects = projects.map((pr) => new ProjectResponseDto(pr));
  return projects;
}
// not transaction : find project by id
async function findById(id) {
  let project = await repository.findById(connection, id);
  if (!project) return undefined;
  return project[0];
}
// transaction : save project
async function saveProject(saveDto) {
  const saveAndGet = async (conn, saveDto) => {
    const insertInfo = await repository.save(conn, saveDto);
    if (!insertInfo) return undefined;
    const insertId = parseInt(insertInfo[0].insertId);
    const projectData = await repository.findById(conn, insertId);
    return new ProjectResponseDto(projectData[0]);
  };
  const result = await transactionManager(connection, saveAndGet, [saveDto]);
  return result;
}
// transaction : delete project
async function deleteById(id) {
  const result = await transactionManager(connection, repository.deleteById, [id]);
  return result[0];
}
const projectService = { findAll, saveProject, findById, deleteById };
export default projectService;
