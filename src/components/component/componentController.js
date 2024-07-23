import Component from "./componentModel";

import Screen from "../screen/screenModel";
import Project from "../project/projectModel";

import { verifyToken } from "../authentication/authenticationUtils";

const createComponent = async (req, res) => {
  try {
    const { screen, name, type, props, father, isCustom } = req.body;

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

    const projectToUpdate = await Project.findById(screenToUpdate.project);

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

    const component = await Component.create({
      screen,
      owner: userId,
      name,
      type,
      props,
      father,
      isCustom,
    });

    screenToUpdate.updatedAt = new Date();

    await screenToUpdate.save();

    projectToUpdate.updatedAt = new Date();

    await projectToUpdate.save();

    return res.json({ component });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: "An error has occurred",
      error: error.message,
    });
  }
};

const getComponents = async (req, res) => {
  try {
    const { screen } = req.params;

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

    const projectToUpdate = await Project.findById(screenToUpdate.project);

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

    const components = await Component.find({ screen }).sort({ createdAt: 1 });

    return res.json({ components });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: "An error has occurred",
      error: error.message,
    });
  }
};

const renameComponent = async (req, res) => {
  try {
    const { name, component } = req.body;

    const token = req.headers.authorization;

    const userId = await verifyToken(token);

    if (!userId) {
      return res.status(401).json({
        mensaje: "Unauthorized",
      });
    }

    const componentToUpdate = await Component.findById(component);

    if (!componentToUpdate) {
      return res.status(404).json({
        mensaje: "Component not found",
      });
    }

    const screenToUpdate = await Screen.findById(componentToUpdate.screen);

    if (!screenToUpdate) {
      return res.status(404).json({
        mensaje: "Screen not found",
      });
    }

    const projectToUpdate = await Project.findById(screenToUpdate.project);

    if (!projectToUpdate) {
      return res.status(404).json({
        mensaje: "Project not found",
      });
    }

    if (projectToUpdate.owner.toString() !== userId) {
      return res.status(401).json({
        mensaje: "Unauthorized",
      });
    }

    componentToUpdate.name = name;

    await componentToUpdate.save();

    screenToUpdate.updatedAt = new Date();

    await screenToUpdate.save();

    projectToUpdate.updatedAt = new Date();

    await projectToUpdate.save();

    return res.json({ component: componentToUpdate });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: "An error has occurred",
      error: error.message,
    });
  }
};

const deleteComponent = async (req, res) => {
  try {
    const { component } = req.params;

    const token = req.headers.authorization;

    const userId = await verifyToken(token);

    if (!userId) {
      return res.status(401).json({
        mensaje: "Unauthorized",
      });
    }

    const componentToDelete = await Component.findById(component);

    if (!componentToDelete) {
      return res.status(404).json({
        mensaje: "Component not found",
      });
    }

    const screenToUpdate = await Screen.findById(componentToDelete.screen);

    if (!screenToUpdate) {
      return res.status(404).json({
        mensaje: "Screen not found",
      });
    }

    const projectToUpdate = await Project.findById(screenToUpdate.project);

    if (!projectToUpdate) {
      return res.status(404).json({
        mensaje: "Project not found",
      });
    }

    if (projectToUpdate.owner.toString() !== userId) {
      return res.status(401).json({
        mensaje: "Unauthorized",
      });
    }

    await Component.findByIdAndDelete(component);

    screenToUpdate.updatedAt = new Date();

    await screenToUpdate.save();

    projectToUpdate.updatedAt = new Date();

    await projectToUpdate.save();

    return res.json({ mensaje: "Component deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: "An error has occurred",
      error: error.message,
    });
  }
};

const updateComponent = async (req, res) => {
  try {
    const { component, props } = req.body;

    const token = req.headers.authorization;

    const userId = await verifyToken(token);

    if (!userId) {
      return res.status(401).json({
        mensaje: "Unauthorized",
      });
    }

    const componentToUpdate = await Component.findById(component);

    if (!componentToUpdate) {
      return res.status(404).json({
        mensaje: "Component not found",
      });
    }

    const screenToUpdate = await Screen.findById(componentToUpdate.screen);

    if (!screenToUpdate) {
      return res.status(404).json({
        mensaje: "Screen not found",
      });
    }

    const projectToUpdate = await Project.findById(screenToUpdate.project);

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

    componentToUpdate.props = props;

    await componentToUpdate.save();

    screenToUpdate.updatedAt = new Date();

    await screenToUpdate.save();

    projectToUpdate.updatedAt = new Date();

    await projectToUpdate.save();

    return res.json({ component: componentToUpdate });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: "An error has occurred",
      error: error.message,
    });
  }
};

export {
  createComponent,
  getComponents,
  renameComponent,
  deleteComponent,
  updateComponent,
};
