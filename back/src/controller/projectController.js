import express from "express";
import { isProjectSaveDto, ProjectSaveDto } from "../dto/project/projectSaveDto.js";
import projectService from "../service/projectService.js";
import { getCommonResponse } from "../util/commonResponse.js";
import taskService from "../service/taskService.js";

const route = express.Router();
const service = projectService;
// GET /projects
route.get("", async (req, res) => {
  const result = await service.findAll();
  if (result === undefined) return res.status(500).send(getCommonResponse(res.statusCode, "Internal Server Error"));
  return res.status(200).send(getCommonResponse(res.statusCode, result));
});
// GET /projects/:projectId
route.get("/:projectId", async (req, res) => {
  const pjId = parseInt(req.params.projectId);
  if (isNaN(pjId)) return res.status(400).send(getCommonResponse(res.statusCode, "invalid pjId"));
  const project = await service.findById(pjId);
  if (project === undefined) return res.status(500).send(getCommonResponse(res.statusCode, "Internal Server Error"));
  else if (project === null) return res.status(404).send(getCommonResponse(res.statusCode, "Data Not Found"));
  const tasks = await taskService.findAllByPjId(parseInt(project.id));
  return res.status(200).send(getCommonResponse(res.statusCode, { project: project, tasks: tasks }));
});
// POST /projects
route.post("", async (req, res) => {
  const dto = new ProjectSaveDto(req.body.title, req.body.description);
  if (!isProjectSaveDto(dto)) return res.status(400).send(getCommonResponse(res.sendStatus, "invalid title or description"));
  const result = await service.saveProject(dto);
  if (result === undefined) return res.status(500).send(getCommonResponse(res.statusCode, "Internal Server Error"));
  return res.status(200).send(getCommonResponse(res.statusCode, result));
});
// POST /projects/:projectId
route.delete("/:projectId", async (req, res) => {
  const pjId = parseInt(req.params.projectId);
  if (isNaN(pjId)) return res.status(400).send(getCommonResponse(res.statusCode, "invalid pjId"));
  const tasks = await taskService.findAllByPjId(pjId);
  if (tasks.length > 0) return res.send(getCommonResponse(400, "task exists on this project"));
  const result = await service.deleteById(pjId);
  if (result === undefined) return res.status(500).send(getCommonResponse(res.statusCode, "Internal Server Error"));
  console.log(result);
  if (result.affectedRows > 0) return res.status(200).send(getCommonResponse(res.statusCode, "success"));
  else return res.status(200).send(getCommonResponse(res.statusCode, "fail"));
});
export default route;
