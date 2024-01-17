const bcryptjs = require("bcryptjs");
const { User, schemas } = require("../../models/user");
const { HttpError } = require("../../helpers");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { error } = schemas.registerSchema.validate({ email, password });
    if (error) {
      throw HttpError(400, error.details[0].message);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashPassword,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      error.status = 400;
    } else if (error.name === "MongoError" && error.code === 11000) {
      error.status = 409;
    }
    next(error);
  }
};

module.exports = register;
