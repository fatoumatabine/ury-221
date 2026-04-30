const prisma = require("../config/db");
const BaseRepository = require("./BaseRepository");

class DossierRepository extends BaseRepository {
  constructor() {
    super(prisma.dossier);
  }

  findById(id) {
    return this.findUnique({
      where: { id },
      include: {
        avocat: true,
        client: true,
        audiences: true,
      },
    });
  }

  findByReference(reference) {
    return this.findUnique({ where: { reference } });
  }

  findAll() {
    return this.findMany({
      include: {
        avocat: true,
        client: true,
        audiences: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  countActiveByAvocat(avocatId, activeStatuts) {
    return this.count({
      avocatId,
      statut: {
        in: activeStatuts,
      },
    });
  }

  countByClient(clientId) {
    return this.count({ clientId });
  }
}

module.exports = new DossierRepository();

