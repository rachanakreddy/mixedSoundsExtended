import express from "express";
import db from "../db/dbclient.js";
import { ObjectId } from "mongodb";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('client/mainpage.html', { root: dirname(__dirname) })
});


router.post("/addsong", async (req, res) => {

  let songscollection = db.collection("songs");
  let song_id = (await songscollection.insertOne(req.body.song)).insertedId;

  res.send({song_id: song_id});

});

//post - submit button
router.post("/submit", async(req, res) => {

  let ratingscollection = db.collection("ratings");
  let historycollection = db.collection("history");

  let history = await historycollection.findOne({ _id: new ObjectId(req.user.history_id) });

  let song_id = req.body.song_id;

  let rating_id = (await ratingscollection.insertOne(req.body.rating)).insertedId;

  history.history.push({song_id: new ObjectId(song_id), rating_id: rating_id.valueOf() });

  const updates = {
    $set: { history : history.history }
  };

  let query = { _id: new ObjectId(req.user.history_id)};
  
  let result = await historycollection.updateOne(query, updates);
  
  res.send(result).status(204);

});

//get playlist names
router.get("/playlistnames", async (req, res) => {

  let playlistscollection = db.collection("playlists");

  let playlists = await playlistscollection.findOne({ _id: new ObjectId(req.user.playlists_id) });

  let arr = playlists.playlists;

  let names = [];

  for (let i = 0; i < arr.length; i++) {
    names.push(arr[i].name);
  }

  let results = {names: names};

  if (!results) res.send("Not found").status(404);
  else res.send(results).status(200);

});

export default router;