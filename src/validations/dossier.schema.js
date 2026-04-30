const { z } = require("zod");

const createDossierSchema = z.object({
  body: z.object({
    reference: z.string().trim().min(1, "La référence est obligatoire."),
    objet: z.string().trim().min(1, "L'objet est obligatoire."),
    avocatId: z.coerce.number().int().positive(),
    clientId: z.coerce.number().int().positive(),
    dateOuverture: z.coerce.date(),
  }),
});

const dossierIdParamSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
});

const updateDossierStatusSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
  body: z.object({
    statut: z.enum(["OUVERT", "EN_COURS", "CLOS", "ARCHIVE"]),
  }),
});

module.exports = {
  createDossierSchema,
  dossierIdParamSchema,
  updateDossierStatusSchema,
};

