// import * as firebase from "firebase-admin";
const firebase = require("firebase-admin");
const config = require("../config");

firebase.initializeApp({
  credential: firebase.credential.cert(config.admin),
  databaseURL: config.db_uri,
});

const db = firebase.database();
const ref = db.ref("tracking");

module.exports = ref;
