const data = require('./dataProvider.js');
const galleries = data.galleries;

const galleriesRootPath = '/api/galleries';

const handleAll = app => {
    app.get(`${galleriesRootPath}`, (req, resp) => resp.json(galleries));
};

const handleByCountry = app => {
    app.get(`${galleriesRootPath}/:country`, (req, resp) => {
        const country = (String(req.params.country)).toLowerCase();

        const matches = galleries.filter(gallery => gallery.GalleryCountry.toLowerCase() == country);
        matches.length > 0 ? resp.json(matches) :
            resp.json({ "message": "provided country has no galleries" });
    });
}

module.exports = {
    handleAll,
    handleByCountry
};