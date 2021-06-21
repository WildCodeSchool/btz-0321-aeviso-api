const prisma = require("../../../../prismaClient");

/**
 * DELETE /api/v1/projects/{id}
 * @summary Delete one project
 * @tags projects
 * @param {string} id.path - id of wanted project
 * @return {object} 204 - No content
 */

const deleteProject = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.project.delete({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (e) {
    res.status(404);
    next(e);
  }
};
module.exports = deleteProject;
