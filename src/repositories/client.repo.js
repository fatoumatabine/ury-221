const prisma = require("../config/db");
const BaseRepository = require("./BaseRepository");

class ClientRepository extends BaseRepository {
  constructor() {
    super(prisma.client);
  }

  findById(id) {
    return this.findUnique({ where: { id } });
  }

  findByEmail(email) {
    return this.findUnique({ where: { email } });
  }
}

module.exports = new ClientRepository();

