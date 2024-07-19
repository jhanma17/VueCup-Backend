import express from "express";

import {
  createScreen,
  getScreens,
  renameScreen,
  deleteScreen,
} from "./screenController";

const router = express.Router();

router.get("/:project", getScreens);

router.post("/create", createScreen);

router.put("/rename", renameScreen);

router.delete("/delete/:screen", deleteScreen);

module.exports = router;
