const express = require("express");
const avocatRoutes = require("./avocat.routes");
const clientRoutes = require("./client.routes");
const dossierRoutes = require("./dossier.routes");
const audienceRoutes = require("./audience.routes");

const router = express.Router();

router.use("/avocats", avocatRoutes);
router.use("/clients", clientRoutes);
router.use("/dossiers", dossierRoutes);
router.use("/audiences", audienceRoutes);

module.exports = router;

