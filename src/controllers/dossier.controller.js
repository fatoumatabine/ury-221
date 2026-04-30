const dossierService = require("../services/dossier.service");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/response");

const findAll = asyncHandler(async (req, res) => {
  const data = await dossierService.findAll();
  return sendSuccess(res, data, "Liste des dossiers récupérée.");
});

const findOne = asyncHandler(async (req, res) => {
  const data = await dossierService.findById(req.params.id);
  return sendSuccess(res, data, "Dossier récupéré.");
});

const create = asyncHandler(async (req, res) => {
  const data = await dossierService.create(req.body);
  return sendSuccess(res, data, "Dossier ouvert.", 201);
});

const updateStatus = asyncHandler(async (req, res) => {
  const data = await dossierService.updateStatus(req.params.id, req.body.statut);
  return sendSuccess(res, data, "Statut du dossier mis à jour.");
});

const remove = asyncHandler(async (req, res) => {
  const data = await dossierService.delete(req.params.id);
  return sendSuccess(res, data, "Dossier supprimé.");
});

module.exports = {
  findAll,
  findOne,
  create,
  updateStatus,
  remove,
};

