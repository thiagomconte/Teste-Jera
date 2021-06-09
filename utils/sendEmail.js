const nodemailer = require("nodemailer");

//nodemailer
var transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = async (movie_name, email) => {
  var mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Lembrete de filme!",
    text: `Não esqueça de assistir ${movie_name}!`,
  };

  transporter.sendMail(mailOptions, (err, info)=>{
    if(err) {
      console.log(err);
    }else{
      console.log("Enviado");
    }
  })
};
