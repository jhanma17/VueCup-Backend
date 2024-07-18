import dotenv from "dotenv";
import admin from "firebase-admin";

// Configuración de variables de entorno
dotenv.config();

const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

export default auth;
