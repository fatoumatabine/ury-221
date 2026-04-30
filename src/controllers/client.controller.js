const clientService = require("../services/client.service");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/response");

const findAll = asyncHandler(async (req, res) => {
  const data = await clientService.findAll();
  return sendSuccess(res, data, "Liste des clients récupérée.");
});

const findOne = asyncHandler(async (req, res) => {
  const data = await clientService.findById(req.params.id);
  return sendSuccess(res, data, "Client récupéré.");
});

const create = asyncHandler(async (req, res) => {
  const data = await clientService.create(req.body);
  return sendSuccess(res, data, "Client créé.", 201);
});

const remove = asyncHandler(async (req, res) => {
  const data = await clientService.delete(req.params.id);
  return sendSuccess(res, data, "Client supprimé.");
});

module.exports = {
  findAll,
  findOne,
  create,
  remove,
};

