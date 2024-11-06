import { isProject } from "../entity/project.js";
import projectRepository from "../repository/projectRepository.js";

const repository = projectRepository;
function findAll() {
  const projects = repository.findAll();
  return projects;
}
function saveProject(project) {
  repository.save(project);
  return true;
}
function findById(id) {
  const projects = repository.findById(id);
  return projects;
}
function deleteById(id) {
  repository.deleteById(id);
  return true;
}
const projectService = { findAll, saveProject, findById, deleteById };
export default projectService;
