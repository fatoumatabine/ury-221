/**
 * @swagger
 * tags:
 *   - name: Avocats
 *   - name: Clients
 *   - name: Dossiers
 *   - name: Audiences
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AvocatInput:
 *       type: object
 *       required: [prenom, nom, numeroBarreau, specialite, email]
 *       properties:
 *         prenom: { type: string, example: "Awa" }
 *         nom: { type: string, example: "Diop" }
 *         numeroBarreau: { type: string, example: "SN-BA-2026-001" }
 *         specialite: { type: string, example: "Droit pénal" }
 *         email: { type: string, format: email, example: "awa.diop@juris221.sn" }
 *         telephone: { type: string, example: "+221771112233" }
 *     ClientInput:
 *       type: object
 *       required: [prenom, nom, email, adresse]
 *       properties:
 *         prenom: { type: string, example: "Ibrahima" }
 *         nom: { type: string, example: "Ndiaye" }
 *         email: { type: string, format: email, example: "ibrahima@example.com" }
 *         telephone: { type: string, example: "+221780001122" }
 *         adresse: { type: string, example: "Dakar, Liberté 6" }
 *     DossierInput:
 *       type: object
 *       required: [reference, objet, avocatId, clientId, dateOuverture]
 *       properties:
 *         reference: { type: string, example: "DOS-2026-001" }
 *         objet: { type: string, example: "Litige commercial" }
 *         avocatId: { type: integer, example: 1 }
 *         clientId: { type: integer, example: 1 }
 *         dateOuverture: { type: string, format: date-time, example: "2026-04-10T10:30:00.000Z" }
 *     AudienceInput:
 *       type: object
 *       required: [dossierId, dateHeure, lieu]
 *       properties:
 *         dossierId: { type: integer, example: 1 }
 *         dateHeure: { type: string, format: date-time, example: "2026-05-10T09:00:00.000Z" }
 *         lieu: { type: string, example: "Tribunal de Dakar" }
 */

/**
 * @swagger
 * /api/avocats:
 *   get:
 *     tags: [Avocats]
 *     summary: Lister les avocats
 *     responses:
 *       200: { description: OK }
 *   post:
 *     tags: [Avocats]
 *     summary: Créer un avocat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AvocatInput'
 *     responses:
 *       201: { description: Créé }
 *       409: { description: Email ou numéro de barreau déjà utilisé }
 */

/**
 * @swagger
 * /api/clients:
 *   get:
 *     tags: [Clients]
 *     summary: Lister les clients
 *     responses:
 *       200: { description: OK }
 *   post:
 *     tags: [Clients]
 *     summary: Créer un client
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClientInput'
 *     responses:
 *       201: { description: Créé }
 *       409: { description: Email déjà utilisé }
 */

/**
 * @swagger
 * /api/dossiers:
 *   get:
 *     tags: [Dossiers]
 *     summary: Lister les dossiers
 *     responses:
 *       200: { description: OK }
 *   post:
 *     tags: [Dossiers]
 *     summary: Ouvrir un dossier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DossierInput'
 *     responses:
 *       201: { description: Créé }
 *       400: { description: Données invalides }
 *       404: { description: Avocat ou client introuvable }
 *       409: { description: Référence déjà utilisée }
 */

/**
 * @swagger
 * /api/audiences:
 *   get:
 *     tags: [Audiences]
 *     summary: Lister les audiences
 *     responses:
 *       200: { description: OK }
 *   post:
 *     tags: [Audiences]
 *     summary: Programmer une audience
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AudienceInput'
 *     responses:
 *       201: { description: Créé }
 *       400: { description: Dossier fermé ou date invalide }
 *       409: { description: Conflit d'agenda avocat }
 */
