//!Working:
//npm install twilio
const {Twilio} = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);

const sendSMSByTwilio = (to, body, txt ) => {
    try {
        client.messages
        .create({
            body: `Beemore Blog - ${txt} - ${body}?`,
            from: process.env.TWILIO_BUY_PHONE_NUMBER,
            to: to,
        })
        .then(message => console.log(message.sid));
    } catch(err) {
        console.log(err);
    }
}


module.exports = sendSMSByTwilio;
