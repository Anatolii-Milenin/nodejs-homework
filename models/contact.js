const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");
const { nanoid } = require("nanoid");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

contactSchema.post("save", handleMongooseError);

model.id = nanoid();

const Contact = model("contact", contactSchema);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
}).messages({ "any.required": "missing required {#label} field" });

const updateContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
}).messages({ "any.required": "missing fields" });

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
}).messages({ "any.required": "Not found" });

module.exports = {
  Contact,
  addSchema,
  updateContactSchema,
  updateFavoriteSchema,
};
