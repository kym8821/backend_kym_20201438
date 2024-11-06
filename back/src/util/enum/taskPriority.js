export const taskPriority = {
  high: "high",
  medium: "medium",
  low: "low",
};

export function isTaskPriority(value) {
  Object.values(taskPriority).forEach((p) => {
    if (p === value) return true;
  });
  return false;
}
