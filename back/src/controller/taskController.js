import express from "express";
import { getCommonResponse } from "../util/commonResponse.js";
import taskService from "../service/taskService.js";
import { isTaskSaveDto, TaskSaveDto } from "../dto/task/taskSaveDto.js";
import { isTaskUpdateDto, TaskUpdateDto } from "../dto/task/taskUpdateDto.js";
import projectService from "../service/projectService.js";

const route = express.Router();
// GET /projects/:projectId/tasks
route.get("/:projectId/tasks", async (req, res) => {
  const projectId = parseInt(req.params.projectId);
  if (!projectId || isNaN(projectId)) return res.status(400).send(getCommonResponse(res.statusCode, "invalid request"));
  const result = await taskService.findAllByPjId(projectId);
  if (!result) return res.status(500).send(getCommonResponse(res.statusCode, "Internal Server Error"));
  return res.status(200).send(getCommonResponse(200, result));
});
// POST /project/:projectId/tasks
route.post("/:projectId/tasks", async (req, res) => {
  const pjId = parseInt(req.params.projectId ? req.params.projectId : req.body.pjId);
  const saveDto = new TaskSaveDto(pjId, req.body.title, req.body.description, req.body.priority, req.body.dueDate);
  if (isNaN(pjId) || !isTaskSaveDto(saveDto) || !(await projectService.findById(pjId)))
    return res.status(400).send(getCommonResponse(res.statusCode, "invalid request"));
  const result = await taskService.save(saveDto);
  if (!result) return res.status(500).send(getCommonResponse(res.statusCode, "Internal Server Error"));
  return res.status(200).send(getCommonResponse(200, result));
});
// PUT /project/:projectId/tasks/:taskId
route.put("/:projectId/tasks/:taskId", async (req, res) => {
  const pjId = parseInt(req.params.projectId);
  const taskId = parseInt(req.params.taskId);
  const updateDto = new TaskUpdateDto(req.body.title, req.body.description, req.body.priority, req.body.dueDate, req.body.status);
  if (isNaN(pjId) || isNaN(taskId) || !isTaskUpdateDto(updateDto))
    return res.status(400).send(getCommonResponse(res.statusCode, "invalid request"));
  const result = await taskService.updateTask(pjId, taskId, updateDto);
  if (result === undefined) return res.status(500).send(getCommonResponse(res.statusCode, "Internal Server Error"));
  else if (result === null) return res.status(404).send(getCommonResponse(res.statusCode, "Data Not Found"));
  return res.status(200).send(getCommonResponse(200, result));
});
// DELETE /project/:projectId/tasks/:taskId
route.delete("/:projectId/tasks/:taskId", async (req, res) => {
  const pjId = parseInt(req.params.projectId);
  const taskId = parseInt(req.params.taskId);
  if (isNaN(pjId) || isNaN(taskId)) return res.status(400).send(getCommonResponse(res.statusCode, "invalid request"));
  const result = await taskService.deleteById(pjId, taskId);
  if (result === undefined) return res.status(500).send(getCommonResponse(res.statusCode, "Internal Server Error"));
  else if (result === null) return res.status(404).send(getCommonResponse(res.statusCode, "Invalid Task Info"));
  else if (result > 0) return res.status(200).send(getCommonResponse(200, "success"));
  else return res.status(200).send(getCommonResponse(200, "fail"));
});

export default route;
