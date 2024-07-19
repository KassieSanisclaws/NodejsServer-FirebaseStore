const admin = require('firebase-admin');
const dotenv = require('dotenv');

// Load environment variables:
dotenv.config();

// Firebase Admin Config:
admin.initializeApp({
        credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

const auth = admin.auth();
const firestore = admin.firestore();

module.exports = { auth, firestore };