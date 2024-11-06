import { checkDate } from '../../util/checkDate.js';
import { taskPriority } from '../../util/enum/taskPriority.js';

export class TaskSaveDto {
  constructor(pjId, title, description, priority, dueDate, status = 'not-started') {
    this.pjId = pjId;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
    this.status = status;
  }
}
export function isTaskSaveDto(dto) {
  if (!dto.pjId || typeof dto.pjId !== 'number') return false;
  if (!dto.title) return false;
  if (!dto.description) return false;
  if (!dto.priority || !taskPriority[dto.priority]) return false;
  if (!dto.dueDate || !checkDate(dto.dueDate)) return false;
  return true;
}
