// task priority enum
export const taskPriority = {
  high: 'high',
  medium: 'medium',
  low: 'low',
};

export function isTaskPriority(value) {
  if (taskPriority[value]) return true;
  return false;
}
