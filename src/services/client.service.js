const clientRepo = require("../repositories/client.repo");
const dossierRepo = require("../repositories/dossier.repo");
const AppError = require("../utils/appError");

class ClientService {
  findAll() {
    return clientRepo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id) {
    const client = await clientRepo.findById(id);
    if (!client) {
      throw new AppError("Client introuvable.", 404);
    }
    return client;
  }

  async create(payload) {
    const existingEmail = await clientRepo.findByEmail(payload.email);
    if (existingEmail) {
      throw new AppError("Cet email est déjà utilisé par un client.", 409);
    }

    return clientRepo.create(payload);
  }

  async delete(id) {
    await this.findById(id);

    const dossierCount = await dossierRepo.countByClient(id);
    if (dossierCount > 0) {
      throw new AppError(
        "Suppression impossible: ce client possède déjà un ou plusieurs dossiers.",
        409
      );
    }

    return clientRepo.delete({ id });
  }
}

module.exports = new ClientService();

