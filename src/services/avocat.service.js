const avocatRepo = require("../repositories/avocat.repo");
const dossierRepo = require("../repositories/dossier.repo");
const AppError = require("../utils/appError");
const { DOSSIER_STATUT } = require("../utils/constants");

class AvocatService {
  findAll() {
    return avocatRepo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id) {
    const avocat = await avocatRepo.findById(id);
    if (!avocat) {
      throw new AppError("Avocat introuvable.", 404);
    }
    return avocat;
  }

  async create(payload) {
    const existingEmail = await avocatRepo.findByEmail(payload.email);
    if (existingEmail) {
      throw new AppError("Cet email est déjà utilisé par un avocat.", 409);
    }

    const existingBarreau = await avocatRepo.findByNumeroBarreau(payload.numeroBarreau);
    if (existingBarreau) {
      throw new AppError("Ce numéro de barreau est déjà utilisé.", 409);
    }

    return avocatRepo.create(payload);
  }

  async delete(id) {
    await this.findById(id);

    const activeCount = await dossierRepo.countActiveByAvocat(id, [
      DOSSIER_STATUT.OUVERT,
      DOSSIER_STATUT.EN_COURS,
    ]);

    if (activeCount > 0) {
      throw new AppError(
        "Suppression impossible: cet avocat a des dossiers OUVERTS ou EN_COURS.",
        409
      );
    }

    return avocatRepo.delete({ id });
  }
}

module.exports = new AvocatService();

