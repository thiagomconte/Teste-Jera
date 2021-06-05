const User = require("../models/User");

module.exports = {
  validateRegister: async function (req, res, next) {
    let { name, email, password, dtNascimento } = req.body;
    if (!name || !email || !password || !dtNascimento) {
      return res.status(400).json("Preencha todos os campos!");
    } else if (email === (await User.findOne({ email }))?.email) {
      return res
        .status(400)
        .json("Este e-mail já se encontra em nossa base de dados");
    }
      next();

  },
};
