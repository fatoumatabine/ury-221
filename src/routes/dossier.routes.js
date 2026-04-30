const express = require("express");
const dossierController = require("../controllers/dossier.controller");
const validate = require("../middlewares/validate");
const {
  createDossierSchema,
  dossierIdParamSchema,
  updateDossierStatusSchema,
} = require("../validations/dossier.schema");

const router = express.Router();

router.get("/", dossierController.findAll);
router.get("/:id", validate(dossierIdParamSchema), dossierController.findOne);
router.post("/", validate(createDossierSchema), dossierController.create);
router.patch("/:id/statut", validate(updateDossierStatusSchema), dossierController.updateStatus);
router.delete("/:id", validate(dossierIdParamSchema), dossierController.remove);

module.exports = router;

