const prisma = require("../../../../prismaClient");

const getProjectsFromCompany = async (req, res, next) => {
  const { id } = req.params;
  try {
    const allProjects = await prisma.company.findUnique({
      where: {
        id,
      }.projects(),
    });
    res.status(200).json(allProjects);
  } catch (e) {
    res.status(404);
    next(e);
  }
};
module.exports = getProjectsFromCompany;
