import express from "express";

import {
  createComponent,
  getComponents,
  renameComponent,
  deleteComponent,
  updateComponent,
} from "./componentController";

const router = express.Router();

router.get("/:screen", getComponents);

router.post("/create", createComponent);

router.patch("/rename", renameComponent);

router.patch("/update", updateComponent);

router.delete("/delete/:component", deleteComponent);

module.exports = router;
