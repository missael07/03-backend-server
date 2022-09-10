const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.DB_GOOGLE_SECRET);
export default async function googleVerify(token: string) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.DB_GOOGLE_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;
    return { email, name, picture };
}