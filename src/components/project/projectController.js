import Project from "./projectModel";

import { verifyToken } from "../authentication/authenticationUtils";

//Project crud

const createProject = async (req, res) => {
  try {
    const { name } = req.body;

    const token = req.headers.authorization;

    const userId = await verifyToken(token);

    if (!userId) {
      return res.status(401).json({
        mensaje: "Unauthorized",
      });
    }

    const project = await Project.create({
      name,
      height: 0,
      width: 0,
      preview: "",
      owner: userId,
    });

    return res.json({ project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: "An error has occurred",
      error,
    });
  }
};

const getProjects = async (req, res) => {
  try {
    const token = req.headers.authorization;

    const userId = await verifyToken(token);

    if (!userId) {
      return res.status(401).json({
        mensaje: "Unauthorized",
      });
    }

    const projects = await Project.find({ owner: userId });

    return res.json({ projects });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: "An error has occurred",
      error,
    });
  }
};

module.exports = {
  createProject,
  getProjects,
};
