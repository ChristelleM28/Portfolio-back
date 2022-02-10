require("dotenv").config();

const emailRouter = require("express").Router();
const nodemailer = require("nodemailer");

const { SENDER_EMAIL_ADDRESS, SENDER_EMAIL_PASSWORD } = process.env;

// On créé la configuration de Nodemailer pour lui donner les infos de connexion
const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user:SENDER_EMAIL_ADDRESS,
    pass:SENDER_EMAIL_PASSWORD,
  },
  tls: {rejectUnauthorized: false},
});

// Pour tester le router
emailRouter.get("/", (req, res) => {
  res.send("Hello email Routes");
});

// Pour recevoir les infos du front dans l'adresse mail définie
emailRouter.post("/html", async (req, res) => {
  const {email, firstname, message} = req.body;
// console.log({email, firstname, message});

  // configuration du contenu de mon mail
  const mailOptions = {
    from: email,
    to: SENDER_EMAIL_ADDRESS, 
    subject:`test to send email with Gmail to ${firstname}`,
    subject: "Just a test html",
    html: ` <p><span>Firstname: </span>${firstname}</p><br /><br /><p><span>Message: </span>${message}</p><br />`
  };

  // J'utilise le transport pour envoyer le mail avec les options
  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send("Email sent with success!");
    }
  })

});

module.exports = emailRouter;
