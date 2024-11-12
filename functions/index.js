"use strict";
// /**
//  * Import function triggers from their respective submodules:
//  *
//  * import {onCall} from "firebase-functions/v2/https";
//  * import {onDocumentWritten} from "firebase-functions/v2/firestore";
//  *
//  * See a full list of supported triggers at https://firebase.google.com/docs/functions
//  */
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectEvilUsers = void 0;
// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
// // export const helloWorld = onRequest((request, response) => {
// //   logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const bad_words_1 = require("bad-words");
admin.initializeApp();
const db = admin.firestore();
exports.detectEvilUsers = functions.firestore
    .document("messages/{msgId}")
    .onCreate(async (snapshot, context) => {
    const filter = new bad_words_1.default();
    const { text, uid } = snapshot.data();
    if (filter.isProfane(text)) {
        const cleaned = filter.clean(text);
        await snapshot.ref.update({
            text: `🤐 I got BANNED for life for saying... ${cleaned}`,
        });
        await db.collection("banned").doc(uid).set({});
    }
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();
    const userData = userDoc.data();
    if ((userData === null || userData === void 0 ? void 0 : userData.msgCount) && userData.msgCount >= 7) {
        await db.collection("banned").doc(uid).set({});
    }
    else {
        await userRef.set({ msgCount: ((userData === null || userData === void 0 ? void 0 : userData.msgCount) || 0) + 1 }, { merge: true });
    }
});
npm;
//# sourceMappingURL=index.js.map