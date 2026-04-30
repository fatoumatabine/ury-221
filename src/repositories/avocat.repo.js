const prisma = require("../config/db");
const BaseRepository = require("./BaseRepository");

class AvocatRepository extends BaseRepository {
  constructor() {
    super(prisma.avocat);
  }

  findById(id) {
    return this.findUnique({ where: { id } });
  }

  findByEmail(email) {
    return this.findUnique({ where: { email } });
  }

  findByNumeroBarreau(numeroBarreau) {
    return this.findUnique({ where: { numeroBarreau } });
  }
}

module.exports = new AvocatRepository();

