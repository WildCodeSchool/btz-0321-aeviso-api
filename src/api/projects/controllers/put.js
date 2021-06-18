const prisma = require("../../../../prismaClient");

/**
 * PUT /api/v1/projects/{id}
 * @summary Update one project
 * @tags projects
 * @param {string} id.path - id of wanted project
 * @param {CreateProject} request.body.required - Project infos to update
 * @return {DisplayProject} 200 - Project successfully retrieved
 */

const put = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, code, taxation } = req.body;

  try {
    const project = await prisma.project.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        code,
        taxation,
      },
    });
    res.status(200).json(project);
  } catch (e) {
    res.status(404);
    next(e);
  }
};

module.exports = put;
