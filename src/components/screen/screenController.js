import Screen from "./screenModel";

import Project from "../project/projectModel";
import Component from "../component/componentModel";

import { verifyToken } from "../authentication/authenticationUtils";

const createScreen = async (req, res) => {
  try {
    const { name, project } = req.body;

    const token = req.headers.authorization;

    const userId = await verifyToken(token);

    if (!userId) {
      return res.status(401).json({
        mensaje: "Unauthorized",
      });
    }

    const projectToUpdate = await Project.findById(project);

    if (!projectToUpdate) {
      return res.status(404).json({
        mensaje: "Project not found",
      });
    }

    if (projectToUpdate.owner.toString() != userId) {
      return res.status(401).json({
        mensaje: "Unauthorized",
      });
    }

    const screen = await Screen.create({
      name,
      project,
    });

    const rootComponent = await Component.create({
      screen: screen._id,
      owner: userId,
      type: "Root",
      name: "Root",
      isCustom: false,
    });

    await Component.create({
      screen: screen._id,
      owner: userId,
      type: "RootTemplate",
      name: "Canvas",
      isCustom: false,
      father: rootComponent._id,
    });

    projectToUpdate.updatedAt = new Date();

    await projectToUpdate.save();

    return res.json({ screen });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: "An error has occurred",
      error: error.message,
    });
  }
};

const getScreens = async (req, res) => {
  try {
    const { project } = req.params;

    const token = req.headers.authorization;

    const userId = await verifyToken(token);

    if (!userId) {
      return res.status(401).json({
        mensaje: "Unauthorized",
      });
    }

    const screens = await Screen.find({ project });

    return res.json({ screens });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: "An error has occurred",
      error: error.message,
    });
  }
};

const renameScreen = async (req, res) => {
  try {
    const { name, screen } = req.body;

    const token = req.headers.authorization;

    const userId = await verifyToken(token);

    if (!userId) {
      return res.status(401).json({
        mensaje: "Unauthorized",
      });
    }

    const screenToUpdate = await Screen.findById(screen);

    if (!screenToUpdate) {
      return res.status(404).json({
        mensaje: "Screen not found",
      });
    }

    const project = await Project.findById(screenToUpdate.project);

    if (!project) {
      return res.status(404).json({
        mensaje: "Project not found",
      });
    }

    if (project.owner.toString() != userId) {
      return res.status(401).json({
        mensaje: "Unauthorized",
      });
    }

    screenToUpdate.name = name;

    await screenToUpdate.save();

    project.updatedAt = new Date();

    await project.save();

    return res.json({ screen: screenToUpdate });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: "An error has occurred",
      error: error.message,
    });
  }
};

const deleteScreen = async (req, res) => {
  try {
    const { screen } = req.params;

    const token = req.headers.authorization;

    const userId = await verifyToken(token);

    if (!userId) {
      return res.status(401).json({
        mensaje: "Unauthorized",
      });
    }

    const screenToDelete = await Screen.findById(screen);

    if (!screenToDelete) {
      return res.status(404).json({
        mensaje: "Screen not found",
      });
    }

    const project = await Project.findById(screenToDelete.project);

    if (!project) {
      return res.status(404).json({
        mensaje: "Project not found",
      });
    }

    if (project.owner.toString() != userId) {
      return res.status(401).json({
        mensaje: "Unauthorized",
      });
    }

    await screenToDelete.remove();

    project.updatedAt = new Date();

    await project.save();

    return res.json({ screen: screenToDelete });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: "An error has occurred",
      error: error.message,
    });
  }
};

module.exports = {
  createScreen,
  getScreens,
  renameScreen,
  deleteScreen,
};
