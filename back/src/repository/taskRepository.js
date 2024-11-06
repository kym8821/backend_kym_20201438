function save(task) {}
function findByPjId(pjId) {}
function update(taskId, pjId) {}
function deleteById(taskId, pjId) {}
const taskRepository = { save, findByPjId, update, deleteById };
export default taskRepository;
