const { z } = require("zod");

const createAudienceSchema = z.object({
  body: z.object({
    dossierId: z.coerce.number().int().positive(),
    dateHeure: z.coerce.date(),
    lieu: z.string().trim().min(1, "Le lieu est obligatoire."),
  }),
});

const audienceIdParamSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
});

const updateAudienceStatusSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
  body: z.object({
    statut: z.enum(["PLANIFIEE", "REPORTEE", "TERMINEE"]),
  }),
});

module.exports = {
  createAudienceSchema,
  audienceIdParamSchema,
  updateAudienceStatusSchema,
};

