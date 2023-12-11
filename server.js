const express = require('express');
const app = express();

turnOnPaintingHandlers();
turnOnArtistHandlers();
turnOnGalleryHandlers();

let port = 8080;
app.listen(port, () => console.log("Server running at port= " + port));

function turnOnPaintingHandlers() {
    const paintingsAPI = require('./scripts/paintingsAPI.js');
    paintingsAPI.handleAll(app);
    paintingsAPI.handleByPaintingID(app);
    paintingsAPI.handleByGalleryID(app);
    paintingsAPI.handleByArtistID(app);
    paintingsAPI.handleByYearRange(app);
    paintingsAPI.handleByTitleMatch(app);
    paintingsAPI.handleByColorMatch(app);
}

function turnOnArtistHandlers(){
    const artistsAPI = require('./scripts/artistsAPI.js');
    artistsAPI.handleAll(app);
    artistsAPI.handleByCountry(app);
}

function turnOnGalleryHandlers(){
    const galleriesAPI = require('./scripts/galleriesAPI.js');
    galleriesAPI.handleAll(app);
    galleriesAPI.handleByCountry(app);
}