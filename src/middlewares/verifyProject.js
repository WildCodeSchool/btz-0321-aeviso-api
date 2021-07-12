const prisma = require("../../prismaClient");

const verifyProject = async (req, res, next) => {
  try {
    if (req.user?.role === "SUPERADMIN") {
      return next();
    }

    const { id: _id, projectId } = req.params;
    const { projectId: bodyProjectId } = req.body;
    const id = _id || projectId || bodyProjectId;

    const project = await prisma.project.findFirst({
      where: {
        id,
        users: {
          every: {
            email: req.user.email,
          },
        },
      },
      select: {
        companyId: true,
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        email: req.user.email,
      },
      select: {
        role: true,
        companyId: true,
      },
    });

    if (user.role === "ADMIN" && user.companyId === project?.companyId) {
      return next();
    }

    if (!user || !project) {
      res.status(403);

      throw new Error("You do not belong to this project.");
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = verifyProject;
