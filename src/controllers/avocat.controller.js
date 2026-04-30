const avocatService = require("../services/avocat.service");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/response");

const findAll = asyncHandler(async (req, res) => {
  const data = await avocatService.findAll();
  return sendSuccess(res, data, "Liste des avocats récupérée.");
});

const findOne = asyncHandler(async (req, res) => {
  const data = await avocatService.findById(req.params.id);
  return sendSuccess(res, data, "Avocat récupéré.");
});

const create = asyncHandler(async (req, res) => {
  const data = await avocatService.create(req.body);
  return sendSuccess(res, data, "Avocat créé.", 201);
});

const remove = asyncHandler(async (req, res) => {
  const data = await avocatService.delete(req.params.id);
  return sendSuccess(res, data, "Avocat supprimé.");
});

module.exports = {
  findAll,
  findOne,
  create,
  remove,
};

