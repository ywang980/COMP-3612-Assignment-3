const path = require('path');
const fs = require('fs');
const jsonFolder = '../data';

const paintings = getJSON(jsonFolder, 'paintings-nested.json');
const artists = getJSON(jsonFolder, 'artists.json');
const galleries = getJSON(jsonFolder, 'galleries.json');

module.exports = {
    paintings,
    artists,
    galleries
};

function getJSON(folder, fileName) {
    const jsonPath = path.join(__dirname, folder, fileName);
    let jsonData = fs.readFileSync(jsonPath, 'utf8');
    return JSON.parse(jsonData);
}