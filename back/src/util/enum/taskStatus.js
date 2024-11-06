export const taskStatus = {
  notStarted: "not-started",
  inProgress: "in-progress",
  done: "done",
};

export function isTaskStatus(value) {
  Object.values(taskStatus).forEach((p) => {
    if (p === value) return true;
  });
  return false;
}
