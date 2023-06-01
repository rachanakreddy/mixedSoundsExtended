# Team 40 Project

# Team Overview
Cristofer Pennacchio https://github.com/Cristofer-Pennacchio

Griffin Ridosh https://github.com/griffinridosh

Shivali Shrivastava https://github.com/shivalish

Sebastian Harder https://github.com/sebastianh

Rachana Reddy https://github.com/rachanakreddy

# Innovative Idea
Our idea is for a music discovery application that allows you to listen to a random song and give it a rating. This website would use an api from some music provider's database with various genres and artists, so you can explore and discover new music. After rating a song, the website saves your rating, allowing you to keep track of your listening history and revisit the songs you liked. A lot of other applications give you recommendations based on your interests but ours will be random so you discover new songs you may have never listened to otherwise.

# Data
The type of data that our application will include are:

* **song** - a song data type will be the audio file of a song and additional information such as its artist, the album art, as well as genre tags that describe the music.

* **rating** - a rating data type will be a numerical value signifying a user's satisfaction of the song out of 5 stars and an optional comment that is saved for the user's viewing and also given to the song.

* **genre** - a genre data type organizes songs from the database into popular catergories that the user can select.

* **playlist** - a playlist data type stores songs which the user can add to make different playlists out of songs that they like.

# Functionality

The functionality of our application includes the following:

* **generate song** - the application takes a genre input from the user and generates a random song from a collection of songs of that genre (from an available API such as Spotify or Last.fm).
* **rate song** - the user rates a song they listen to from 1 to 5 stars and that rating is stored within the associated song data type.
* **create playlist** - there are different ways to create playlists out of the saved song/rating information.
  * **manually adding songs** - playlists can be created the traditional way by manually adding songs (ones that have or have not already been listened to).
  * **using song data filters** - playlists can be created using filters on the songs that have been listened to and rated (e.g. songs of 'rock' genre with rating >3 stars)
  * **export playlist to file, Spotify, etc.** - the user will be able to export created playlists to a file, and depending on the difficulty of the task, saving the playlist to various streaming services.
* **data linked to user account** - all elements of this application will be saved to a specific user, and future sessions of a given user will load previously saved data so that the user can accumulate more listening data over time.

# License
[MIT License](https://opensource.org/licenses/MIT)
