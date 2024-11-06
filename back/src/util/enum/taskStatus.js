// task status enum
export const taskStatus = {
  'not-started': 'not-started',
  'in-progress': 'in-progress',
  done: 'done',
};

export function isTaskStatus(value) {
  if (taskStatus[value]) return true;
  return false;
}
