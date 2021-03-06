const errors = require("../../errors");
const prisma = require("../../../../prismaClient");

/**
 * GET /api/v1/projects/{id}
 * @summary View one project
 * @tags projects
 * @param {string} id.path - id of wanted project
 * @return {DisplayProject} 200 - Project successfully retrieved
 */

const getOne = async (req, res, next) => {
  try {
    const result = await prisma.project.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (result) res.status(200).json(result);
    else res.status(404).json(errors.projects[404]);
  } catch (e) {
    res.status(400);
    next(e);
  }
};
module.exports = getOne;
