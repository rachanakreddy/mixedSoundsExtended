const clientID = '31a69cb16d5248f2870cae5abad2561b';
const clientSecret = '917e79d402504281a7616258567680de';

import express from 'express';

const router = express.Router();

router.get("/authtoken", async (req, res) => {

    const auth = "Basic " + new Buffer.from(clientID + ':' + clientSecret).toString('base64');

    var authHeaders = new Headers();
    authHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    authHeaders.append("Authorization", auth);
    authHeaders.append("Cookie", "__Host-device_id=AQBmrqW9UyzeXpYmcrN9V2Cg94fCOzHp609V2QGqsa_o_uG9mjh2lFXYoDWaF-iJRFLI0C-VPZHnbWPTBjdR2JaN9EEqHyAwccg; sp_tr=false");

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    var authOptions = {
    method: 'POST',
    headers: authHeaders,
    body: urlencoded,
    redirect: 'follow'
    };

    let response = await fetch("https://accounts.spotify.com/api/token", authOptions);

    let data = await response.json();

    res.send(data);

});

router.post("/gettrack", async (req, res) => {

    var trackHeaders = new Headers();
    trackHeaders.append("Authorization", 'Bearer ' + req.body.token);

    var trackOptions = {
        method: 'GET',
        headers: trackHeaders,
        redirect: 'follow'
    }
    
    let url = "https://api.spotify.com/v1/search?q=" + req.body.quer +"&type=track&limit=1&offset=" + req.body.offset;

    let response = await fetch(url, trackOptions);

    let data = await response.json();

    res.send(data);

});

export default router;