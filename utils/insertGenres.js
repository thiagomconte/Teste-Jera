const Genres = require("../models/Genre");
const axios = require("axios")

module.exports = async () =>{
  const genres = await Genres.countDocuments();
  if(genres === 0){
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=pt-BR`).then( async (res) =>{
      const newGenres = res.data.genres;
      await Genres.insertMany(newGenres).then(() => {
        console.log("Genres inserted")
      }).catch( err =>{
        console.log(err);
      })
    })
  }
}