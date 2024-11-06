export class ProjectUpdateDto {
  constructor(title = undefined, description = undefined, tasks = undefined) {
    if (title) this.title = title;
    if (description) this.description = description;
    if (tasks) this.tasks = tasks;
  }
}

export function isProjectUpdateDto(dto) {
  if (title && typeof title !== 'string') return false;
  if (description && typeof description !== 'string') return false;
  if (tasks && typeof tasks !== 'string') return false;
  return true;
}
