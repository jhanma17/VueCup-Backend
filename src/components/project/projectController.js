import Project from "./projectModel";
import Screen from "../screen/screenModel";

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
      owner: userId,
    });

    await Screen.create({
      name: "Screen 1",
      project: project._id,
    });

    return res.json({ project });
  } catch (error) {
    return res.status(500).json({
      mensaje: "An error has occurred",
      error: error.message,
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
    return res.status(500).json({
      mensaje: "An error has occurred",
      error: error.message,
    });
  }
};

module.exports = {
  createProject,
  getProjects,
};
