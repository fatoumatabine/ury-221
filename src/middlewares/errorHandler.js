const { Prisma } = require("@prisma/client");

module.exports = (error, req, res, next) => {
  if (error.statusCode) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      details: error.details || undefined,
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Violation de contrainte d'unicité.",
        details: error.meta,
      });
    }
  }

  // eslint-disable-next-line no-console
  console.error(error);
  return res.status(500).json({
    success: false,
    message: "Erreur interne du serveur.",
  });
};

