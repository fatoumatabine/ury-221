const { z } = require("zod");
const { idParamSchema } = require("./common.schema");

const createClientSchema = z.object({
  body: z.object({
    prenom: z.string().trim().min(1, "Le prénom est obligatoire."),
    nom: z.string().trim().min(1, "Le nom est obligatoire."),
    email: z.string().trim().email("Email invalide."),
    telephone: z.string().trim().min(3).optional(),
    adresse: z.string().trim().min(1, "L'adresse est obligatoire."),
  }),
});

module.exports = {
  createClientSchema,
  clientIdParamSchema: idParamSchema,
};

