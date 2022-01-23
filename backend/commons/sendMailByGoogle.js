// // !Not Working:
// // !Không nên dùng vì mã sẽ reset trong 7 ngày
// // !Nên dùng Send Mail By SendGrid

// const {google} = require('googleapis') //npm i googleapis
// const nodemailer = require('nodemailer'); //npm i nodemailer
// const {OAuth2} = google.auth;
// const jwt = require('./tokenJWT')
// const dotenv = require ('dotenv');
// dotenv.config();

// const oauth2Client = new OAuth2(
//     process.env.MAIL_CLIENT_ID,
//     process.env.MAIL_CLIENT_SECRET,
//     process.env.MAIL_REFRESH_TOKEN,
//     process.env.OAUTH_PLAYGROUND,
// )

// const sendEmailbyGoogle = (to, url,txt) => {
//     oauth2Client.setCredentials({
//         refresh_Token: process.env.MAIL_REFRESH_TOKEN
//     })

//     const accessToken = oauth2Client.getAccessToken();

//     const smtpTransport = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             type: "OAuth2",
//             user: process.env.SEND_EMAIL_ADDRESS,
//             clientId: process.env.MAIL_CLIENT_ID,
//             clientSecret: process.env.MAIL_CLIENT_SECRET,
//             refresh_Token: process.env.MAIL_REFRESH_TOKEN,
//             accessToken
//         }
//     })

//     const mailOptions = {
//         from: process.env.SEND_EMAIL_ADDRESS,
//         to: to,
//         subject: "Kay Project",
//         html: `
//         <h1> Click link to activate </h1>
//         <a href = ${url}>${txt}</a>
//         <hr/>
//         <p>This email contain sensetive info</p>
//         `
//     }

//     smtpTransport.sendMail(mailOptions, (err, infor) => {
//         if (err) return err;
//         return infor;
//     })
// }


// module.exports= sendEmailbyGoogle;