const express = require("express");
const clientController = require("../controllers/client.controller");
const validate = require("../middlewares/validate");
const { createClientSchema, clientIdParamSchema } = require("../validations/client.schema");

const router = express.Router();

router.get("/", clientController.findAll);
router.get("/:id", validate(clientIdParamSchema), clientController.findOne);
router.post("/", validate(createClientSchema), clientController.create);
router.delete("/:id", validate(clientIdParamSchema), clientController.remove);

module.exports = router;

