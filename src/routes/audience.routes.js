const express = require("express");
const audienceController = require("../controllers/audience.controller");
const validate = require("../middlewares/validate");
const {
  createAudienceSchema,
  audienceIdParamSchema,
  updateAudienceStatusSchema,
} = require("../validations/audience.schema");

const router = express.Router();

router.get("/", audienceController.findAll);
router.get("/:id", validate(audienceIdParamSchema), audienceController.findOne);
router.post("/", validate(createAudienceSchema), audienceController.create);
router.patch("/:id/statut", validate(updateAudienceStatusSchema), audienceController.updateStatus);
router.delete("/:id", validate(audienceIdParamSchema), audienceController.remove);

module.exports = router;

