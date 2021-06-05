const router = require("express").Router();
const Profile = require('../models/Profile');
const auth = require("../authorization/auth");
const {validateProfile} = require("../validator/profileRoutesValidator")

/**
 * @POST
 * CRIA PERFIL DO USUÁRIO
 */
router.post("/register", auth, validateProfile, async(req, res) => {
  try {
    const newProfile = new Profile({name :req.body.name, user_id: req.decoded.id});
    await newProfile.save();
    return res.json("Perfil criado com sucesso!");
  } catch (error) {
    return res.status(500).json("Erro interno, não foi possível concluir a operação")
  }
})

module.exports = router;
