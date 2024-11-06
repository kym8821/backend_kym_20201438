import { checkDate } from '../../util/checkDate.js';
import { isTaskPriority } from '../../util/enum/taskPriority.js';
import { isTaskStatus, taskStatus } from '../../util/enum/taskStatus.js';

export class TaskUpdateDto {
  constructor(title, description, priority, dueDate, status) {
    if (title) this.title = title;
    if (description) this.description = description;
    if (priority) this.priority = priority;
    if (dueDate) this.dueDate = dueDate;
    if (status) this.status = status;
  }
}

export function isTaskUpdateDto(dto) {
  if (dto.priority && !isTaskPriority(dto.priority)) return false;
  if (dto.dueDate && !checkDate(dto.dueDate)) return false;
  if (dto.status && !isTaskStatus(dto.status)) return false;
  return true;
}
