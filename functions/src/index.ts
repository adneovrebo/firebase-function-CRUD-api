import * as functions from "firebase-functions";
import api from "./api";

// EXPORT API
exports.api = functions.https.onRequest(api);
