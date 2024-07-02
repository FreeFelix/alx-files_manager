import fs from 'fs';
import readline from 'readline';
import { promisify } from 'util';
import mimeMessage from 'mime-message';
import { gmail_v1 as gmailV1, google } from 'googleapis';

// Promisify file read and write operations for convenience
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
// The file token.json stores the user's access and refresh tokens, and is created automatically when the authorization flow completes for the first time.
const TOKEN_PATH = 'token.json';

/**
 * Get and store new token after prompting for user authorization, and then execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {function} callback The callback for the authorized client.
 */
async function getNewToken(oAuth2Client, callback) {
  // Generate authentication URL
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);

  // Create interface for user input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Prompt user for authorization code
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();

    // Get and set the token using the provided code
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        console.error('Error retrieving access token', err);
        return;
      }
      oAuth2Client.setCredentials(token);

      // Store the token to disk for later program executions
      writeFileAsync(TOKEN_PATH, JSON.stringify(token))
        .then(() => {
          console.log('Token stored to', TOKEN_PATH);
          callback(oAuth2Client);
        })
        .catch((writeErr) => console.error(writeErr));
    });
  });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  console.log('Client authorization beginning');
  // Check if we have previously stored a token.
  await readFileAsync(TOKEN_PATH)
    .then((token) => {
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    })
    .catch(async () => getNewToken(oAuth2Client, callback));
  console.log('Client authorization done');
}

/**
 * Delivers a mail through the user's account.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param {gmailV1.Schema$Message} mail The message to send.
 */
function sendMailService(auth, mail) {
  const gmail = google.gmail({ version: 'v1', auth });

  // Use Gmail API to send the email
  gmail.users.messages.send(
    {
      userId: 'me', // The special identifier 'me' refers to the authenticated user
      requestBody: mail,
    },
    (err, _res) => {
      if (err) {
        console.log(`The API returned an error: ${err.message || err.toString()}`);
        return;
      }
      console.log('Message sent successfully');
    }
  );
}

/**
 * Contains routines for mail delivery with GMail.
 */
export default class Mailer {
  /**
   * Checks and initiates OAuth2 authentication.
   */
  static checkAuth() {
    readFileAsync('credentials.json')
      .then(async (content) => {
        await authorize(JSON.parse(content), (auth) => {
          if (auth) {
            console.log('Auth check was successful');
          }
        });
      })
      .catch((err) => {
        console.log('Error loading client secret file:', err);
      });
  }

  /**
   * Builds a MIME message for the given recipient, subject, and message body.
   * @param {string} dest The recipient's email address.
   * @param {string} subject The subject of the email.
   * @param {string} message The body of the email.
   * @returns {Object} The MIME message in a format suitable for the Gmail API.
   */
  static buildMessage(dest, subject, message) {
    const senderEmail = process.env.GMAIL_SENDER; // The sender's email address
    const msgData = {
      type: 'text/html', // MIME type of the email
      encoding: 'UTF-8', // Character encoding of the email
      from: senderEmail,
      to: [dest],
      cc: [],
      bcc: [],
      replyTo: [],
      date: new Date(), // Current date and time
      subject,
      body: message, // The email body content
    };

    // Validate sender email
    if (!senderEmail) {
      throw new Error(`Invalid sender: ${senderEmail}`);
    }
    
    // Validate and create MIME message
    if (mimeMessage.validMimeMessage(msgData)) {
      const mimeMsg = mimeMessage.createMimeMessage(msgData);
      return { raw: mimeMsg.toBase64SafeString() };
      // Convert the MIME message to a base64-encoded string
    }
    throw new Error('Invalid MIME message');
  }

  /**
   * Sends an email using the Gmail API.
   * @param {gmailV1.Schema$Message} mail The message to send.
   */
  static sendMail(mail) {
    readFileAsync('credentials.json')
      .then(async (content) => {
        await authorize(
          JSON.parse(content),
          (auth) => sendMailService(auth, mail)
          // Use the authorized client to send the email
        );
      })
      .catch((err) => {
        console.log('Error loading client secret file:', err);
      });
  }
}
