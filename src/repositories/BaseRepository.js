class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  findMany(args = {}) {
    return this.model.findMany(args);
  }

  findUnique(args) {
    return this.model.findUnique(args);
  }

  create(data) {
    return this.model.create({ data });
  }

  update(where, data) {
    return this.model.update({ where, data });
  }

  delete(where) {
    return this.model.delete({ where });
  }

  count(where = {}) {
    return this.model.count({ where });
  }
}

module.exports = BaseRepository;

