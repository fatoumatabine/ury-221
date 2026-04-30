const audienceRepo = require("../repositories/audience.repo");
const dossierRepo = require("../repositories/dossier.repo");
const AppError = require("../utils/appError");
const { DOSSIER_STATUT, AUDIENCE_STATUT } = require("../utils/constants");

class AudienceService {
  findAll() {
    return audienceRepo.findAll();
  }

  async findById(id) {
    const audience = await audienceRepo.findById(id);
    if (!audience) {
      throw new AppError("Audience introuvable.", 404);
    }
    return audience;
  }

  async create(payload) {
    const dossier = await dossierRepo.findById(payload.dossierId);
    if (!dossier) {
      throw new AppError("Le dossier indiqué n'existe pas.", 404);
    }

    if (![DOSSIER_STATUT.OUVERT, DOSSIER_STATUT.EN_COURS].includes(dossier.statut)) {
      throw new AppError(
        "Une audience ne peut être programmée que pour un dossier OUVERT ou EN_COURS.",
        400
      );
    }

    if (payload.dateHeure.getTime() <= Date.now()) {
      throw new AppError("La date de l'audience doit être dans le futur.", 400);
    }

    const conflict = await audienceRepo.findConflictByAvocatAndDate(
      dossier.avocatId,
      payload.dateHeure
    );

    if (conflict) {
      throw new AppError(
        "Conflit agenda: cet avocat a déjà une audience à cette date/heure.",
        409
      );
    }

    return audienceRepo.create({
      ...payload,
      statut: AUDIENCE_STATUT.PLANIFIEE,
    });
  }

  async updateStatus(id, statut) {
    await this.findById(id);
    return audienceRepo.update({ id }, { statut });
  }

  async delete(id) {
    await this.findById(id);
    return audienceRepo.delete({ id });
  }
}

module.exports = new AudienceService();

