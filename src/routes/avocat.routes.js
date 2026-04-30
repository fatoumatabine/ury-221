const express = require("express");
const avocatController = require("../controllers/avocat.controller");
const validate = require("../middlewares/validate");
const { createAvocatSchema, avocatIdParamSchema } = require("../validations/avocat.schema");

const router = express.Router();

router.get("/", avocatController.findAll);
router.get("/:id", validate(avocatIdParamSchema), avocatController.findOne);
router.post("/", validate(createAvocatSchema), avocatController.create);
router.delete("/:id", validate(avocatIdParamSchema), avocatController.remove);

module.exports = router;

