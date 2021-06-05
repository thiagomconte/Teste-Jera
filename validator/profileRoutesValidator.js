const Profile = require('../models/Profile')


module.exports = {
  validateProfile: async function(req, res, next) {
    try {
      numberOfProfiles = await Profile.countDocuments({user_id: req.decoded.id});
      if(numberOfProfiles >= 4){
        return res.status(400).json("Você atingiu o limite de 4 perfils por conta!")
      }
      next();
    } catch (error) {
      return res.status(500).json("Erro interno");
    }
  }
}