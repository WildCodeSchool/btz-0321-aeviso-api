const prisma = require("../../../../prismaClient");

/**
 * GET /api/v1/records/{id}
 * @summary View one record
 * @tags records
 * @param {string} id.path - id of wanted record
 * @return {DisplayRecord} 200 - Record successfully retrieved
 */

module.exports = async (req, res, next) => {
  const { id } = req.params;

  try {
    const record = await prisma.record.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(record);
  } catch (error) {
    res.status(404);

    next(error);
  }
};
