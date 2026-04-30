const dossierRepo = require("../repositories/dossier.repo");
const avocatRepo = require("../repositories/avocat.repo");
const clientRepo = require("../repositories/client.repo");
const audienceRepo = require("../repositories/audience.repo");
const AppError = require("../utils/appError");
const { DOSSIER_STATUT, AUDIENCE_STATUT } = require("../utils/constants");

class DossierService {
  findAll() {
    return dossierRepo.findAll();
  }

  async findById(id) {
    const dossier = await dossierRepo.findById(id);
    if (!dossier) {
      throw new AppError("Dossier introuvable.", 404);
    }
    return dossier;
  }

  async create(payload) {
    const avocat = await avocatRepo.findById(payload.avocatId);
    if (!avocat) {
      throw new AppError("L'avocat indiqué n'existe pas.", 404);
    }

    const client = await clientRepo.findById(payload.clientId);
    if (!client) {
      throw new AppError("Le client indiqué n'existe pas.", 404);
    }

    const existingReference = await dossierRepo.findByReference(payload.reference);
    if (existingReference) {
      throw new AppError("Cette référence de dossier existe déjà.", 409);
    }

    if (payload.dateOuverture.getTime() > Date.now()) {
      throw new AppError("La date d'ouverture ne peut pas être dans le futur.", 400);
    }

    return dossierRepo.create({
      ...payload,
      statut: DOSSIER_STATUT.OUVERT,
    });
  }

  async updateStatus(id, statut) {
    await this.findById(id);
    return dossierRepo.update({ id }, { statut });
  }

  async delete(id) {
    await this.findById(id);

    const plannedAudienceCount = await audienceRepo.count({
      dossierId: id,
      statut: AUDIENCE_STATUT.PLANIFIEE,
    });

    if (plannedAudienceCount > 0) {
      throw new AppError(
        "Suppression impossible: ce dossier contient des audiences PLANIFIEES.",
        409
      );
    }

    return dossierRepo.delete({ id });
  }
}

module.exports = new DossierService();

