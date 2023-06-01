import { getTrackinfo } from "../js/spotify.js";

const onestar = document.getElementById("1star");
const twostar = document.getElementById("2star");
const threestar = document.getElementById("3star");
const fourstar = document.getElementById("4star");
const fivestar = document.getElementById("5star");
const submit = document.getElementById("submit");

const genres = document.getElementById("genres");

const ratings = [onestar, twostar, threestar, fourstar, fivestar];

let song = {};
let songid = "";
let rating = 0;
let audio = new Audio();

const randSong = async () => {

    let data = await getTrackinfo();

    //add song to database
    const response = await fetch(`/home/addsong`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "song": data
        })
    })

    let id = await response.json();

    songid = id.song_id;

    return data;
}

const selectRating = (event) => {

    if (ratingsclicked(event.target)) {

        rating = 0;

        for (let i = 0; i < ratings.length; i++) {
            const smileyface = ratings[i];
            smileyface.style.opacity = "100%";
        }

    } else {

        for (let i = 0; i < ratings.length; i++) {
            const smileyface = ratings[i];
            if (smileyface.id !== event.target.id) {
                smileyface.style.opacity = "50%";
            } else {
                smileyface.style.opacity = "100%";
                rating = i + 1;
            }
        }
    }
}

const ratingsclicked = (target) => {
    let clicked = true;
    ratings.forEach( (x) => { clicked = x === target ? clicked : x.style.opacity == 0.5; });
    return clicked;
}

const selectGenre = (event) => {
    document.getElementById("selectedGenre").innerHTML = event.target.innerHTML;
}

const initializeRatingSelection = () => {

    for (let i = 0; i < ratings.length; i++) {
        ratings[i].addEventListener("mouseover", (event) => event.target.style.opacity = 0.7);
        ratings[i].addEventListener("mouseout", (event) => event.target.style.opacity = 1);
        ratings[i].addEventListener("click", selectRating);
    }

}

const initializeGenreSelection = () => {

    var genre = document.getElementById('genres').getElementsByClassName('genre');

    for (let i = 0; i < genre.length; i++) {
        genre[i].addEventListener("click", selectGenre);
    }
}

const submitRating = async () => {

    if (rating == 0) {
        alert("select a rating!");
    } else {

        const comment = document.getElementById("comment").value;

        const response = await fetch(`/home/submit`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "song_id": songid,
                "rating": {
                    "rating": rating,
                    "comment": comment
                }
            })
        })

        const stat = response.status;

        if (stat !== 400) {
            alert("submitted rating");
        } else {
            alert("woops it didn't work");
        }

    }

}

const initializePlaylistSelection = async () => {

    const dropdown = document.getElementById("playlists_dropdown");
    dropdown.innerHTML = "";

    const res = await fetch('/home/playlistnames', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
      });
    
      const data = await res.json();
      const status = res.status;
 
      if (status == 200) {

        for (let i = 0; i < data.names.length; i++) {

            const link = document.createElement("a");

            link.class = "playlist";
            link.innerHTML = data.names[i];
            link.addEventListener("click", addSongtoPlaylist);

            dropdown.appendChild(link);
        }

      }
    
    dropdown.style.display = "block";

}

const addSongtoPlaylist = async (event) => {

    const playlistname = String(event.target.textContent);

    //currrently adds the song mystery lady to database
    let res = await fetch(`/playlists/addsong/${playlistname}`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "song_id": songid
        })
    });

    const status = res.status;

    if (status == 200) {
        alert("added: " + song.name + " to " + playlistname);
    } else {
        alert("woops that did not work");
    }

    document.getElementById("playlists_dropdown").style.display = "none";

}

const generateSong = async () => {
    
    song = await randSong();

    //render title, artist, and album image
    const album = document.getElementById("album-image");
    const title = document.getElementById("songtitle");
    const artist = document.getElementById("artists");

    album.innerHTML = "";
    title.innerHTML = "";
    artist.innerHTML = "";

    const img = document.createElement("img");
    img.className = "album";
    img.src = song.art;
    img.id = "albumcover";

    album.appendChild(img);

    title.innerHTML = song.name + " from '" + song.album + "'";

    let artists = "";

    song.artists.forEach((x) => artists += x + ", " );

    artist.innerHTML = artists.substring(0, artists.length - 2);

    //clear textarea
    const textarea = document.getElementById("comment");
    textarea.value = "";

    initializeRatingSelection();

    //var audio = new Audio(song.mp3);
    audio.setAttribute('src', song.mp3); //change the source

    playback(audio);

}


const playback = (audio) => {

    document.getElementById("albumcover").addEventListener("click", async () => {

        if (audio.paused) {
            audio.play();
        }
        else {
            audio.pause();
        }

    });

    document.getElementById("replayicon").addEventListener("click", async () => {  
        audio.load();
        audio.play();
     });

    document.getElementById("volumeicon").addEventListener("click", async () => {  
        audio.volume = ((audio.volume + 0.25) % 1)
     });

  };

await generateSong();
initializeRatingSelection();
initializeGenreSelection();
submit.addEventListener("click", submitRating);

const add = document.getElementById("addicon");
add.addEventListener("click", initializePlaylistSelection);

const nextbutton = document.getElementById("nextbutton");
nextbutton.addEventListener("click", generateSong);

playback();