import express from "express";

import { createProject, getProjects } from "./projectController";

const router = express.Router();

router.get("/", getProjects);

router.post("/create", createProject);

module.exports = router;
