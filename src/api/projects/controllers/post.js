const prisma = require("../../../../prismaClient");

/**
 * POST /api/v1/projects
 * @summary Create one project
 * @tags projects
 * @param {PostProject} request.body.required - Project info
 * @return {DisplayProject} 201 - Project successfully created
 */

const post = async (req, res, next) => {
  const { name, description, code, taxation, companyId } = req.body;
  try {
    const project = await prisma.project.create({
      data: {
        name,
        code,
        description,
        taxation,
        company: {
          connect: {
            id: companyId,
          },
        },
      },
    });
    res.status(201).json(project);
  } catch (e) {
    res.status(422);
    next(e);
  }
};
module.exports = post;
