import express from "express";

import { createProject } from "./projectController";

const router = express.Router();

router.post("/create", createProject);

module.exports = router;
