import express from "express";
import { isProjectSaveDto, ProjectSaveDto } from "../dto/projectSaveDto.js";
import projectService from "../service/projectService.js";

const route = express.Router();
const service = projectService;

route.get("", (req, res) => {
  const result = service.findAll();
  if (!result) return res.status(404).send("cannot find data");
  return res.status(200).send(result);
});
route.get("/:projectId", (req, res) => {
  const pjId = parseInt(req.params.projectId);
  if (isNaN(pjId)) return res.status(400).send("invalid id");
  const result = service.findById(pjId);
  if (!result) return res.status(404).send();
  return res.status(200).send(result);
});
route.post("", (req, res) => {
  console.log(req.body);
  const dto = new ProjectSaveDto(req.body.title, req.body.description);
  if (!isProjectSaveDto(dto)) return res.status(400).send();
  const result = service.saveProject(dto);
  if (!result) return res.status(500).send();
  return res.status(200).send(result);
});
route.delete("/:projectId", (req, res) => {
  const pjId = parseInt(req.params.projectId);
  if (isNaN(pjId)) return res.status(400).send("invalid id");
  const result = service.deleteById(pjId);
  if (!result) return res.status(500).send();
  return res.status(200).send(result);
});

export default route;
