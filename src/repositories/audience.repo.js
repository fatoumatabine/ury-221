const prisma = require("../config/db");
const BaseRepository = require("./BaseRepository");

class AudienceRepository extends BaseRepository {
  constructor() {
    super(prisma.audience);
  }

  findById(id) {
    return this.findUnique({
      where: { id },
      include: {
        dossier: {
          include: {
            avocat: true,
            client: true,
          },
        },
      },
    });
  }

  findAll() {
    return this.findMany({
      include: {
        dossier: {
          include: {
            avocat: true,
            client: true,
          },
        },
      },
      orderBy: {
        dateHeure: "asc",
      },
    });
  }

  findConflictByAvocatAndDate(avocatId, dateHeure) {
    return this.model.findFirst({
      where: {
        dateHeure,
        dossier: {
          avocatId,
        },
      },
      include: {
        dossier: true,
      },
    });
  }

  countPlannedByDossier(dossierId) {
    return this.count({
      dossierId,
      statut: "PLANIFIEE",
    });
  }
}

module.exports = new AudienceRepository();

