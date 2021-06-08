const router = require("express").Router();
const Profile = require("../models/Profile");
const Watchlist = require("../models/Watchlist");
const auth = require("../authorization/auth");
const { validateProfile } = require("../validator/profileRoutesValidator");


/**
 * @POST
 * CRIA PERFIL DO USUÁRIO
 */
router.post("/register", auth, validateProfile, async (req, res) => {
  try {
    const newProfile = new Profile({
      name: req.body.name,
      user_id: req.decoded.id,
    });
    await newProfile.save();
    return res.json("Perfil criado com sucesso!");
  } catch (error) {
    return res
      .status(500)
      .json("Erro interno, não foi possível concluir a operação");
  }
});

/**
 * @GET
 * RETORNA A LISTA DE PERFILS DA CONTA CONECTADA
 */
router.get("/", auth, async (req, res) => {
  try {
    const profiles = await Profile.find({ user_id: req.decoded.id })
    return res.json(profiles);
  } catch (error) {
    return res.status(500).json("Erro interno");
  }
});

/**
 * @GET
 * ADICIONA FILMES PARA A LSITA DO PERFIL
 */
router.post("/addwatchlist", auth, async (req, res) => {
  try {
    let { movie_id, genre_ids, profile_id } = req.body;

    let movieFound = await Watchlist.findOne({ movie_id });
    if (movieFound)
      return res.status(400).json("Filme já se encontra na sua lista");

    const watchlist = new Watchlist({ movie_id, profile_id });
    await watchlist.save();

    await Profile.findByIdAndUpdate(profile_id, {
      $addToSet: {genre_ids: genre_ids}
    })

    return res.status(200).json("Filme foi adicionado nas lista com sucesso");
  } catch (error) {
    return res.status(500).json("Erro interno");
  }
});

/**
 * @GET
 * RETORNA A LISTA DE FILMES DO PERFIL
 */
router.get('/mylist/:profileId', auth, async (req, res) => {
  try {
    const list = await Watchlist.find({profile_id: req.params.profileId});
    return res.json(list);
  } catch (error) {
    return res.status(500).json("Erro carregar lista de filmes");
  }
})

/**
 * @POST
 * ATUALIZA FILME PARA ASSISTIDO 
 */
router.post('/checkWatch', auth, async(req, res) => {
  try {
    await Watchlist.findOneAndUpdate({movie_id: req.body.id}, {
      $set: {assistiu: true}
    })
    return res.json("Atualizado com sucesso");
  } catch (error) {
    return res.status(500).json("Erro interno, tente novamente mais tarde");
  }
})


module.exports = router;
