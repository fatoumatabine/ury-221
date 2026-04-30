const { z } = require("zod");
const { idParamSchema } = require("./common.schema");

const createAvocatSchema = z.object({
  body: z.object({
    prenom: z.string().trim().min(1, "Le prénom est obligatoire."),
    nom: z.string().trim().min(1, "Le nom est obligatoire."),
    numeroBarreau: z.string().trim().min(1, "Le numéro de barreau est obligatoire."),
    specialite: z.string().trim().min(1, "La spécialité est obligatoire."),
    email: z.string().trim().email("Email invalide."),
    telephone: z.string().trim().min(3).optional(),
  }),
});

module.exports = {
  createAvocatSchema,
  avocatIdParamSchema: idParamSchema,
};

