import express from "express";

import { login, signUp } from "./authenticationController";

const router = express.Router();

router.post("/login", login);

router.post("/sign-up", signUp);

// Exportamos la configuración de express app
module.exports = router;
