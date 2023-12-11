const data = require('./dataProvider.js');
const artists = data.artists;

const artistsRootPath = '/api/artists';

const handleAll = app => {
    app.get(`${artistsRootPath}`, (req, resp) => resp.json(artists));
};

const handleByCountry = app => {
    app.get(`${artistsRootPath}/:country`, (req, resp) => {
        const country = (String(req.params.country)).toLowerCase();

        const matches = artists.filter(artist => artist.Nationality.toLowerCase() == country);
        matches.length > 0 ? resp.json(matches) :
            resp.json({ "message": "provided country has no artists" });
    });
}

module.exports = {
    handleAll,
    handleByCountry
};