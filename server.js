require('dotenv').config();

// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const email = process.env.email;
const superSecretPwd = process.env.superSecretPwd;


// const environment = process.env.NODE_ENV;
// const isDevelopment = environment === 'development';
// const isStaging = environment === 'staging';
// const isProduction = environment === 'production';


// Create an instance of the express app.
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 3000;

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



// Routes
app.get('/', function (req, res) {
    res.render('inicio');
});
app.get('/inscribe', function (req, res) {
    res.render('inscribe');
});
app.get('/avisoDePrivacidad', function (req, res) {
    res.render('privacidad');
});
app.get('/contacto', function (req, res) {
    res.render('contacto');
});
// app.get('/:params?', function (req, res) {
//     var params = req.params.params;
//     res.render(params);
// })
app.post("/ajax/email", function (request, response) {
    console.log(email);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: email,
            pass: superSecretPwd
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var textBody = `FROM: ${request.body.name}; EMAIL: ${request.body.email}; MESSAGE: ${request.body.message}`;
    var htmlBody = `<h2>Correo de contacto</h2><p>Nombre: ${request.body.name} </p> <p>Fecha de nacimiento: ${request.body.birthday} </p> <p> Correo electrónico: <a href='mailto: ${request.body.email}'>${request.body.email}</a></p><p>Número de contacto:${request.body.number} </p><p>Checkbox: ${request.body.checkbox}</p>`;
    var mail = {
        from: '"Team: Alejandro Vilpa',
        to: 'hebrit_626@hotmail.com',
        subject: '¡Alguien ha dejado sus datos en tu sitio web!',
        html: htmlBody
    };
    transporter.sendMail(mail, function (err, info) {
        if (err) {
            return console.log(err);
        } else {
            console.log("message sent!");
        };
    });
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});



