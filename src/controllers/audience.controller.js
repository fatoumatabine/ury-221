const audienceService = require("../services/audience.service");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/response");

const findAll = asyncHandler(async (req, res) => {
  const data = await audienceService.findAll();
  return sendSuccess(res, data, "Liste des audiences récupérée.");
});

const findOne = asyncHandler(async (req, res) => {
  const data = await audienceService.findById(req.params.id);
  return sendSuccess(res, data, "Audience récupérée.");
});

const create = asyncHandler(async (req, res) => {
  const data = await audienceService.create(req.body);
  return sendSuccess(res, data, "Audience programmée.", 201);
});

const updateStatus = asyncHandler(async (req, res) => {
  const data = await audienceService.updateStatus(req.params.id, req.body.statut);
  return sendSuccess(res, data, "Statut de l'audience mis à jour.");
});

const remove = asyncHandler(async (req, res) => {
  const data = await audienceService.delete(req.params.id);
  return sendSuccess(res, data, "Audience supprimée.");
});

module.exports = {
  findAll,
  findOne,
  create,
  updateStatus,
  remove,
};

