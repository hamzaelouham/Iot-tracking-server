const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  front_url: process.env.APP_URL,
  db_uri: process.env.DATABASE_URI,
  admin: JSON.parse(process.env.FIREBASE_SECRET),
};
