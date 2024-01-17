// controllers/auth/register.js

const bcryptjs = require("bcryptjs");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const register = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Проверка наличия пользователя с таким email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw HttpError(409, "Email in use");
    }

    // Хеширование пароля
    const hashPassword = await bcryptjs.hash(password, 10);

    // Создание нового пользователя
    const newUser = await User.create({
      email,
      password: hashPassword,
      subscription: "starter", // или другое значение по умолчанию
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    // Перехватываем ошибки и отправляем их в обработчик ошибок
    next(error);
  }
};

module.exports = register;
