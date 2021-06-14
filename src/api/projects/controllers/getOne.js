const errors = require("../../errors");
const prisma = require("../../../../prismaClient");

const getOne = async (req, res) => {
  try {
    const result = await prisma.project.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (result) res.status(200).json(result);
    else res.status(404).json(errors.projects[404]);
  } catch (e) {
    res.status(400).json(errors[400]);
  }
};
module.exports = getOne;
