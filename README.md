# Liri-Node-App
Week 6 - LIRI Bot Assignment

Created during Week 6 of Rutgers Coding Bootcamp. The challenge was to use Node JS to create a LIRI bot, like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data based on one of four commands:

  * `my-tweets`

  * `spotify-this-song`

  * `movie-this`

  * `do-what-it-says`

In addition to the data being logged to your terminal/bash window, the data will append to the log.txt file 

## Getting Started

- Clone down repo.
- Run command 'npm install' in Terminal or GitBash
- Run command 'node liri.js' or one of the commands below.

## What Each Command Does

1. `node liri.js my-tweets`

  * Displays my last 20 tweets and when they were created in terminal/bash window.

2. `node liri.js spotify-this-song <song name>`

  * Shows the following information about the song in terminal/bash window.
    * Artist(s)
    * The song's name
    * A preview link of the song from Spotify
    * The album that the song is from

  * Or if no song is passed through, it will default to "The Sign Ace of Base"

3. `node liri.js movie-this <movie name>`

  * Shows the following information in terminal/bash.

    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Cast of the movie.


  * Or if no movie is passed through, it will default to "Mr. Nobody"

4. `node liri.js do-what-it-says`

  * Takes the text from random.txt file and runs the song through spotify-this-song command

## Tech used
- Node.js
- Twitter NPM Package - https://www.npmjs.com/package/twitter
- Spotify NPM Package - https://www.npmjs.com/package/spotify
- Request NPM Package - https://www.npmjs.com/package/request
- FS (File System) NPM Package - A core node package for reading and writing files

## Prerequisites
```
- Node.js - Download the latest version of Node https://nodejs.org/en/
```

## Built With

* Sublime Text - Text Editor

## Authors

* **Nicole Carvalho** - *Node JS* - [Nicole Carvalho](https://github.com/nicolelcarvalho)





