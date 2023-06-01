const historycontainer = document.getElementById("historyContainer");

const render = async () => {

    const res = await fetch('/history/user', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

    const data = await res.json();
    const status = res.status;

    if (status === 200) {
        renderlisteninghistory(data);
    } else {
        alert("error listening history not found");
    }

}

const renderlisteninghistory = (data) => {

    for (let i = 0; i < data.length; i++) {

        const songEntry = document.createElement("div");
        const info = document.createElement("div");
        const title = document.createElement("div");
        const artist = document.createElement("div");
        const album = document.createElement("div");
        const genre = document.createElement("div");
        

        songEntry.className = "songEntry";
        info.className = "info";
        title.className = "title";
        artist.className = "artist";
        album.className = "album";
        genre.className = "genre";

        title.innerHTML = data[i].song.name;

        let artists = "";

        data[i].song.artists.forEach((x) => artists += x + ", " );

        artist.innerHTML = artists.substring(0, artists.length - 2);
        album.innerHTML = data[i].song.album;
        genre.innerHTML = data[i].song.genre.toUpperCase();

        info.appendChild(title);
        info.appendChild(artist);
        info.appendChild(album);
        info.appendChild(genre);

        songEntry.appendChild(info);
        songEntry.appendChild(ratingdiv(data[i].rating.rating));
        songEntry.appendChild(comment(data[i].rating.comment));

        historycontainer.appendChild(songEntry);   
    }

}

const comment = (input) => {

    const comment = document.createElement("div");
    const rating = document.createElement("div");
    const title = document.createElement("h6");

    comment.className = "comment";
    rating.className = "rating";

    title.innerHTML = "Comment";
    rating.innerHTML = input;

    comment.appendChild(title);
    comment.appendChild(rating);

    return comment;

}

const ratingdiv = (number) => {

    const rating = document.createElement("div");
    const title = document.createElement("h6");
    const ratings = document.createElement("div");

    rating.className = "rating";
    title.innerText = "Rating";

    for (let i = 1; i <= 5; i++) {

        const img = document.createElement("img");

        img.src = "images/" + i + "star.png";

        if (number == i) {
            img.className = "selected";
        }

        ratings.appendChild(img);

    }

    rating.appendChild(title);
    rating.appendChild(ratings);
    
    return rating;

}


render();