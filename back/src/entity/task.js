import { checkDate } from "../util/checkDate";
import { isTaskPriority } from "../util/enum/taskPriority";
import { isTaskStatus } from "../util/enum/taskStatus";

export class Task {
  constructor(pjId, id, title, description, priority, dueDate, status) {
    this.pjId = pjId;
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
    this.status = status;
  }
}

export function isTask(task) {
  if (
    typeof task.pjId !== "number" ||
    typeof task.id !== "number" ||
    typeof task.title !== "string" ||
    typeof task.description !== "string"
  )
    return false;
  if (typeof task.dueDate !== "string" || !checkDate(task.dueDate)) return false;
  if (typeof task.priority !== "string" || isTaskPriority(task.priority)) return false;
  if (typeof task.status !== "string" || !isTaskStatus(task.status)) return false;
  return true;
}
