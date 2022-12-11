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

const sendConfirmationEmail = (name, email, confirmationCode) => {
    console.log('Check');
    console.log(`http://127.0.0.1:5173/auth/confirm/${confirmationCode}/`);
    transport.sendMail({
        from: user,
        to: email,
        subject: "Por favor, confirme su cuenta",
        html: `
        <head>
        
        <style type='text/css'>
            div{
                margin: 0;
                background-color:#f5f5f5;
            }

            table{
                border-spacing: 0;
            }

            td{
                padding: 0;
            }
            img{
                border: 0;
            }

            .wrapper {
                width: 100%;
                table-layout: fixed;
                background-color: #f5f5f5;
                padding-bottom: 40px;
            }

            .menu {
                background-color: #ffffff;
                margin: 0 auto;
                width:100%;
                max-width: 600px;
                border-spacing: 0;
                font-family: sans-serif;
                color:black;
            }

            @media screen and (max-width: 600px){

            }
        </style>
        </head>
        <div>
            <center class="wrapper">
                <table class="menu" width="100%">

                <! -- SOCIAL MEDIA ICONS -->    
                    <tr>
                        <td>
                            <table width="100%">
                                <tr>
                                    <td>
                                    
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>


                <! -- LOGO SECTION -->    
                    <tr>
                        <td>
                            <table width="100%" style="background-color: #212E46;">
                                <tr>
                                    <td style="text-align: center; padding: 10px;">
                                      <img src="cid:sendiitLogo" width="180" alt="Logo">
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>


                <! -- TITLE, TEXT $BUTTON -->  
                <tr>
                <td >
                    <table width="100%">
                        <tr>
                            <td style="text-align:center; padding: 15px;">
                              <h1 style="color:#212E46;">Confirmación de email</h1>
                              <p style="font-size: 20px; font-weight: bold">Hola, <strong style="color: #E41F1A;"> ${ name }</strong></p>
                              <p  style="font-size: 15px; line-height:23px;padding:5px 15px 15px;">Gracias por registrarte en sendiit. Por favor, confirma tu email dando click al siguiente botón: </p>
                              <a  style="background-color: #E41F1A;color:#ffffff; text-decoration: none; padding: 12px 20px;border-radius: 15px;font-weight: bold;" href=http://127.0.0.1:5173/auth/confirm/${confirmationCode}/> Da click aquí </a>
                              
                              </td>
                        </tr>
                    </table>
                </td>
            </tr>

            </table>
            </center>
        </div>
        `,
        attachments : [{
            filename: 'logo_sendiit-light.png',
            path: __dirname + '/logo_sendiit-light.png',
            cid: 'sendiitLogo'
        }]

    }).catch( error => console.log(error) );
};


const sendRecoverEmail = (name, email, uid, token) => {
    console.log('Sending recover email...');
    console.log(`http://127.0.0.1:5173/auth/reset-password/${uid}/${token}/`);
    transport.sendMail({
        from: user,
        to: email,
        subject: "Restablecer contraseña",
        html: `
        <head>
        
        <style type='text/css'>
            div{
                margin: 0;
                background-color:#f5f5f5;
            }

            table{
                border-spacing: 0;
            }

            td{
                padding: 0;
            }
            img{
                border: 0;
            }

            .wrapper {
                width: 100%;
                table-layout: fixed;
                background-color: #f5f5f5;
                padding-bottom: 40px;
            }

            .menu {
                background-color: #ffffff;
                margin: 0 auto;
                width:100%;
                max-width: 600px;
                border-spacing: 0;
                font-family: sans-serif;
                color:black;
            }

            @media screen and (max-width: 600px){

            }
        </style>
        </head>
        <div>
            <center class="wrapper">
                <table class="menu" width="100%">

                <! -- SOCIAL MEDIA ICONS -->    
                    <tr>
                        <td>
                            <table width="100%">
                                <tr>
                                    <td>
                                    
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>


                <! -- LOGO SECTION -->    
                    <tr>
                        <td>
                            <table width="100%" style="background-color: #212E46;">
                                <tr>
                                    <td style="text-align: center; padding: 10px;">
                                      <img src="cid:sendiitLogo" width="180" alt="Logo">
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>


                <! -- TITLE, TEXT $BUTTON -->  
                <tr>
                <td >
                    <table width="100%">
                        <tr>
                            <td style="text-align:center; padding: 15px;">
                              <h1 style="color:#212E46;">Restablecer contraseña</h1>
                              <p style="font-size: 20px; font-weight: bold">Hola, <strong style="color: #E41F1A;"> ${ name }</strong></p>
                              <p  style="font-size: 15px; line-height:23px;padding:5px 0 15px;">Se ha solicitado restablecer tu contraseña, da click en el siguiente botón: </p>
                              <a  style="background-color: #E41F1A;color:#ffffff; text-decoration: none; padding: 12px 20px;border-radius: 15px;font-weight: bold;" href=http://127.0.0.1:5173/auth/reset-password/${uid}/${token}/> Da click aquí </a>
                              <p style="font-size: 15px; line-height:23px;padding:5px 0 15px;">Si no has sido tú quien ha solicitado este cambio, por favor ignora este email.</p> 
                              </td>
                        </tr>
                    </table>
                </td>
            </tr>

            </table>
            </center>
        </div>
        `,
        attachments : [{
            filename: 'logo_sendiit-light.png',
            path: __dirname + '/logo_sendiit-light.png',
            cid: 'sendiitLogo'
        }]

    }).catch( error => console.log(error) );
}

module.exports = {
    sendConfirmationEmail,
    sendRecoverEmail
}