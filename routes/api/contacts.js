const express = require("express");
const Joi = require("joi");
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
}).messages({ "any.required": "missing required {#label} field" });

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

router.get("/", ctrl.getAll);
router.get("/:contactId", ctrl.getById);
router.post("/", validateBody(addSchema), ctrl.addContact);
router.delete("/:contactId", ctrl.deleteContact);
router.put("/:contactId", validateBody(updateSchema), ctrl.updateContact);

module.exports = router;
