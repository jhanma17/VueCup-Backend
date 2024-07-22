import express from "express";

let router = express.Router();

import authenticationRoutes from "./components/authentication/authenticationRoutes";
import projectRoutes from "./components/project/projectRoutes";
import screenRoutes from "./components/screen/screenRoutes";
import componentRoutes from "./components/component/componentRoutes";

router.use("/authentication", authenticationRoutes);
router.use("/projects", projectRoutes);
router.use("/screens", screenRoutes);
router.use("/components", componentRoutes);

export default router;
