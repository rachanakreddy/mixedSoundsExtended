import db from "../db/dbclient.js";

const getUser = async (username) => {

    let usercollection = db.collection("userbase");

    //find already registered user
    let result = await usercollection.findOne({ username: username });

    return result;

}

const registerUser = async (username, password) => {

    let usercollection = db.collection("userbase");
    let historycollection = db.collection("history");
    let playlistcollection = db.collection("playlists");
  
    //create history
    const history_id = (await historycollection.insertOne({history: []})).insertedId;
  
    //create playlists
    const playlists_id = (await playlistcollection.insertOne({playlists: []})).insertedId;
  
    //insert into userbase
    const result = await usercollection.insertOne({ username: username, password: password, history_id: history_id.valueOf(), playlists_id: playlists_id.valueOf() });

    return result.insertedId;
  
}

export { getUser, registerUser };
