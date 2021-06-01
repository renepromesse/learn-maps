const functions = require("firebase-functions");
const algoliasearch = require("algoliasearch").default;

const APP_ID = functions.config().app;
const ADMIN_API_KEY = functions.config().key;

const client = algoliasearch(APP_ID, ADMIN_API_KEY);
const index = client.initIndex("snow_estate");

// runs when a new document is created in firestore

exports.addToIndex = functions.firestore
    .document("properties/{propertyId}")
    .onCreate((snapshot) =>{
      const data = snapshot.data();
      const objectID = snapshot.id;
      return index.saveObject({...data, objectID});
    });

// runs when a document is updated

exports.updateToIndex = functions.firestore
    .document("properties/{propertyId}")
    .onUpdate((change) =>{
      const data = change.after.data();
      const objectID = change.after.id;

      return index.saveObject({...data, objectID});
    });

// runs when a document is deleted

exports.deleteFromIndex = functions.firestore
    .document("properties/{propertyId}")
    .onDelete((snapshot) => index.deleteObject(snapshot.id));

    