export class Project {
  constructor(id, title, description, tasks = []) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.tasks = tasks;
  }
}

export function isProject(project) {
  if (typeof project.id !== "number" || typeof project.title !== "string" || typeof project.description !== "string") return false;
  if (!Array.isArray(project.tasks)) return false;
  return true;
}
