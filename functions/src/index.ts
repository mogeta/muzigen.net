import * as functions from "firebase-functions";

// The Firebase Admin SDK to access Firestore.
import * as admin from "firebase-admin";

admin.initializeApp();


// export class Blog {
//   constructor(
//     public id: string,
//       // public name: string,
//       // public price: number,
//   ) {
//   }
// }

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const blogs = functions.https.onRequest(async (request, response) => {
  // functions.logger.info("Hello logs!", {structuredData: true});

  // response.set("Access-Control-Allow-Headers", "*");
  // response.set("Access-Control-Allow-Origin", "*");
  // response.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST");

  const querySnapshot = await admin.firestore().collection("blog_contents")
      .select("id")
      .orderBy("update_date", "desc").get();
  const records = querySnapshot.docs.map((elem) => elem.data());

  // await admin.firestore().collection('messages');
  response.set("Content-Type", "application/json");
  response.send(JSON.stringify(records));
});
