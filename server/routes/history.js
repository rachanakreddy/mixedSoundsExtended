import express from "express";
import db from "../db/dbclient.js";
import { ObjectId } from "mongodb";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('client/listeninghistory.html', { root: dirname(__dirname) })
});

//get - fetches listening history and ratings
router.get("/user", async (req, res) => {

  //get objectid for user
  //fetch listening history
  //fetch ratings
  //send array of json objects with listening history and ratings

  let usercollection = db.collection("userbase");
  let ratingscollection = db.collection("ratings");
  let songscollection = db.collection("songs");
  let historycollection = db.collection("history");

  let user = await usercollection.findOne({ _id: new ObjectId(req.user._id) });

  let history = await historycollection.findOne({ _id: user.history_id });

  let historyarray = history.history;

  let arr = [];

  for (let i = 0; i < historyarray.length; i++) {

    let song = await songscollection.findOne({ _id: historyarray[i].song_id });
    let rating = await ratingscollection.findOne({ _id: historyarray[i].rating_id });

    let obj = { song: song, rating: rating };

    arr.push(obj);

  }

  if (!arr) res.send("Not found").status(404);
  else res.send(arr).status(200);

});

//change comment


//change rating

export default router;