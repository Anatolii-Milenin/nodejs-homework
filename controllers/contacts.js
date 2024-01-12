const {
  Contact,
  addSchema,
  updateFavoriteSchema,
} = require("../models/contact");
const { nanoid } = require("nanoid");

const { HttpError } = require("../helpers");
const ctrlWrapper = require("../helpers/сtrlWrapper");

const listContacts = async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
  console.log(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findById(id);

  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(result);
};

const addContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) {
      const missingField = error.details[0].context.label;
      throw HttpError(400, `missing required ${missingField} field`);
    }

    const newContact = {
      id: nanoid(),
      ...req.body,
    };

    const result = await Contact.create(newContact);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    throw HttpError(400, "missing fields");
  }

  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;

  if (!req.body || !req.body.favorite) {
    return next(HttpError(400, "missing field favorite"));
  }

  const { error } = updateFavoriteSchema.validate(req.body);

  if (error) {
    return next(HttpError(400, "Not found"));
  }

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    return next(HttpError(404, "Not found"));
  }

  res.json(result);
};

const removeContact = async (req, res, next) => {
  console.log(req.params);
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({
    message: "contact deleted",
  });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  removeContact: ctrlWrapper(removeContact),
};
