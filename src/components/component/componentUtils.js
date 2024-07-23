import Screen from "../screen/screenModel.js";
import Project from "../project/projectModel.js";

const verifyScreenOwnership = async (screen, userId) => {
  try {
    const screenToUpdate = await Screen.findById(screen);

    if (!screenToUpdate) {
      return false;
    }

    const projectToUpdate = await Project.findById(screenToUpdate.project);

    if (!projectToUpdate) {
      return false;
    }

    if (projectToUpdate.owner.toString() != userId) {
      return false;
    }

    screenToUpdate.updatedAt = new Date();
    projectToUpdate.updatedAt = new Date();

    await screenToUpdate.save();
    await projectToUpdate.save();

    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  verifyScreenOwnership,
};
