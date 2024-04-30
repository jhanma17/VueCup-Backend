import express from "express";

let router = express.Router();

import authenticationRoutes from "./components/authentication/authenticationRoutes";

router.use("/authentication", authenticationRoutes);

export default router;
