const nodemailer = require('nodemailer');

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASSWORD;

//Para la conexión SMTP
const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user, pass,
    },
});
//Creamos el email
const sendConfirmationEmail = (name, email, confirmationCode) => {
    console.log('Check');
    transport.sendMail({
        from: user,
        to: email,
        subject: "Por favor confirme su cuenta",
        html: `<div>
        <img src='./sendiit-original.png' alt='Imagen de sendiit'/>
        <h1>Confirmación de Email</h1>
        <h2>Hola ${ name }</h2>
        <p>Gracias por registrarte en sendiit. Por favor confirma tu email dando click en el siguiente link:</p>
        <a href=http://127.0.0.1:5173/auth/confirm/${confirmationCode}> Da click aquí </a>
        </div>
        `

    }).catch( error => console.log(error) );
};

const sendRecoverEmail = (name, email, uid, token) => {
    console.log('Sending recover email...');
    transport.sendMail({
        from: user,
        to: email,
        subject: "Restablecer contraseña",
        html: `<div><h1>Restablecer contraseña</h1>
        <h2>Hola ${ name }</h2>
        <p>Se ha solicitado restablecer tu contraseña, da click en el siguiente link: </p>
        <a href=http://127.0.0.1:5173/auth/reset-password/${uid}/${token}/> Da click aquí </a>
        <p>Si no has sido tú quien ha solicitado este cambio, por favor ignora este email.</p>
        </div>
        `

    }).catch( error => console.log(error) );
}

module.exports = {
    sendConfirmationEmail,
    sendRecoverEmail
}