import fs from "fs";
import { Project } from "../entity/project.js";

const path = "./back/data/project.json";

function getProjects() {
  const contents = fs.readFileSync(path, "utf-8");
  const result = JSON.parse(contents);
  return result;
}
function findAll() {
  const projects = getProjects().project;
  return projects;
}
function findById(id) {
  const projects = getProjects().project;
  let result = undefined;
  projects.forEach((pr) => {
    if (parseInt(pr.id) === id) {
      result = pr;
    }
  });
  return result;
}
function save(saveDto) {
  const contents = getProjects();
  const id = contents["id"]++;
  contents.project.push(new Project(id, saveDto.title, saveDto.description));
  fs.writeFileSync(path, JSON.stringify(contents));
}
function deleteById(id) {
  const contents = getProjects();
  contents.project = contents.project.filter((pr) => pr.id !== id);
  console.log(contents);
  fs.writeFileSync(path, JSON.stringify(contents));
}
const projectRepository = { findAll, findById, save, deleteById };
export default projectRepository;
