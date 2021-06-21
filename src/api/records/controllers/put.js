const prisma = require("../../../../prismaClient");

/**
 * PUT /api/v1/records/{id}
 * @summary Update one record
 * @tags records
 * @param {string} id.path - id of wanted project
 * @param {CreateRecord} request.body.required - Project infos to update
 * @return {DisplayRecord} 200 - Project successfully retrieved
 */

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { timeslot, comment } = req.body;

  try {
    const record = await prisma.record.update({
      where: {
        id,
      },
      data: {
        timeslot,
        comment,
      },
    });

    res.status(200).json(record);
  } catch (error) {
    res.status(404);

    next(error);
  }
};
