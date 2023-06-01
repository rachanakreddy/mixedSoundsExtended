const getAuthToken = async () => {

    const res = await fetch(`/spotify/authtoken`, {
        method: "GET"
    })
    
    let token = await res.json();

    return token.access_token;
}

const getTrack = async (token, quer, offset) => {

    const res = await fetch(`/spotify/gettrack`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'token': token,
            'quer': quer,
            'offset': offset
        })
    });


    let track = await res.json();

    return track.tracks.items[0];

}

const randomTrack = async() => {

    let authToken = await getAuthToken();

    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let randomAlph = Math.floor(Math.random()* 26);
    let query = alphabet[randomAlph]; //get a random letter to search

    let random_offset = Math.floor(Math.random() * 1000); //offset for spotify search can go up to 1000

    let track = await getTrack(authToken, query, random_offset);

    return track;
}

const getTitle = async (track) => {
    const title = await track.name;
    return title;//return string
}

const getArtist = async(track) => {
    const arr = [];
    const artists = await track.artists;

    for (let i = 0; i < artists.length; i++) {
        arr.push(artists[i].name)
    }

    return arr;
}

const getAlbum = async(track) => {
    const album = await track.album.name; //return string
    return album;
}

const getArt = async(track) => {
    const art = await track.album.images[0].url; //returns a 640 x 640 image; to get 300 x 400 do images[1]
    return art;
}

const getMP3 = async(track) => {
    const mp3 = await track.preview_url;
    return mp3;
}


const getTrackinfo = async () => {

    const track = await randomTrack();
    const title = await getTitle(track);
    const artists = await getArtist(track);
    const album = await getAlbum(track);
    const mp3 = await getMP3(track);
    const art = await getArt(track);

    return {
        "name": title,
        "artists": artists,
        "album": album,
        "genre": "will figure it out",
        "mp3": mp3,
        "art": art
    }

}

export { getTrackinfo };