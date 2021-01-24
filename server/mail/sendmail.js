const { google } = require('googleapis');
const nodemailer = require('nodemailer');
require('dotenv').config();

const MAIL_CLIENT_ID = process.env.MAIL_CLIENT_ID;
const MAIL_CLIENT_SECRET = process.env.MAIL_CLIENT_SECRET;
const MAIL_TOKEN = process.env.MAIL_TOKEN;
const REDIRECT_URI = process.env.REDIRECT_URI;
const oAuth2Client = new google.auth.OAuth2(MAIL_CLIENT_ID, MAIL_CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: MAIL_TOKEN});


async function sendMail(email, username) {
    try {
        /*
        Create transport for email and authorizing our oAuth2Client
        */
        const accesstoken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'gradeio1234@gmail.com',
                clientId: MAIL_CLIENT_ID,
                clientSecret: MAIL_CLIENT_SECRET,
                refreshToken: MAIL_TOKEN,
                accessToken: accesstoken
            }
        });
        /*
        Generate JWT token save it to database and send the token in email
        */
        const mailOptions = {
            from: 'Grade.io <gradeio1234@gmail.com>',
            to: email,
            subject: 'Verification Email',
            text: 'Hello this is a test',
            html: 
            `
            <h1>Thank you for registering on Grade.io</h1> <br/> 
            Please click <a href="http://localhost:3000/confirm/${username}">Here</a> to verify your account
            `
        }
        const result = await transport.sendMail(mailOptions)
        return result;
    }
    catch (error) {
        return error
    }
}

module.exports = sendMail;