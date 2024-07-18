import express from "express";

let router = express.Router();

import authenticationRoutes from "./components/authentication/authenticationRoutes";
import projectRoutes from "./components/project/projectRoutes";

router.use("/authentication", authenticationRoutes);
router.use("/project", projectRoutes);

export default router;
