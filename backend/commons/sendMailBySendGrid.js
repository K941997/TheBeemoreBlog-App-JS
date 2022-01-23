//!Working:
//! Send Mail By SendGrid:
const sendGridMail = require('@sendgrid/mail');
require('dotenv').config();

const sendMailBySendgrid = (to, url, txt) => {
    sendGridMail.setApiKey(process.env.MAIL_KEY);

    const emailData = {
        subject: "The Beemore Group",
        html: `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
        <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to The Beemore Blog.</h2>
        <p>Congratulations! You're almost set to start using The Beemore Blog.
            Just click the button below to validate your email address.
        </p>
        
        <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
    
       
        `,
        from: process.env.EMAIL_FROM,
        to: to,
        
        
    }
    sendGridMail.send(emailData).then(sent => {
        console.log("Success");
    }).catch(err => {
        console.log(err);
    })
}

module.exports = sendMailBySendgrid
  

  