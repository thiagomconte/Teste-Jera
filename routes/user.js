const router = require("express").Router();
const { validateRegister } = require("../validator/userRoutesValidators");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @POST
 * *REGISTRA USUÁRIOS NO BANCO
 */
router.post("/register", validateRegister, async (req, res) => {
  try {
    let { name, email, password, dtNascimento } = req.body;

    const newUser = new User({
      email,
      name,
      password: await bcrypt.hash(password, 10),
      dtNascimento,
    });
    await newUser.save();

    return res.json("Conta registrada com sucesso!");
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json("Erro interno, não foi possível completar o registro!");
  }
});

/**
 * @POST
 * *LOGIN DE USUÁRIOS
 */
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json("Credenciais incorretas");
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.SECRET_KEY,{expiresIn: "7d",}
    );



    return res.json({token,
      user: {
        name: user.name,
        email: user.email,
      }, api_key: process.env.API_KEY
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json("Erro interno,não foi possível completar a operação")
  }
});

module.exports = router;
