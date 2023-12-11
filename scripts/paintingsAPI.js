const data = require('./dataProvider.js');
const paintings = data.paintings;

const paintingsRootPath = '/api/painting'

const handleAll = app => {
    app.get(`${paintingsRootPath}s`, (req, resp) => resp.json(paintings));
};

const handleByPaintingID = app => {
    app.get(`${paintingsRootPath}/:id`, (req, resp) => {
        const matches = paintings.find(painting => painting.paintingID == req.params.id);
        matches ? resp.json(matches) :
            resp.json({ "message": "painting with provided ID does not exist" });
    });
};

const handleByGalleryID = app => {
    app.get(`${paintingsRootPath}/gallery/:id`, (req, resp) => {
        const matches = paintings.filter(painting => painting.gallery.galleryID == req.params.id);
        matches.length > 0 ? resp.json(matches) :
            resp.json({ "message": "gallery with provided ID has no paintings" });
    });
}

const handleByArtistID = app => {
    app.get(`${paintingsRootPath}/artist/:id`, (req, resp) => {
        const matches = paintings.filter(painting => painting.artist.artistID == req.params.id);
        matches.length > 0 ? resp.json(matches) :
            resp.json({ "message": "artist with provided ID has no paintings" });
    });
}

const handleByYearRange = app => {
    app.get(`${paintingsRootPath}/year/:min/:max`, (req, resp) => {
        const matches = paintings.filter(painting => painting.yearOfWork >= req.params.min
            && painting.yearOfWork <= req.params.max);
        matches.length > 0 ? resp.json(matches) :
            resp.json({ "message": "no paintings fall within the provided year range" });
    });
}

const handleByTitleMatch = app => {
    app.get(`${paintingsRootPath}/title/:text`, (req, resp) => {
        const text = (String(req.params.text)).toLowerCase();
        const matches = paintings.filter(painting => painting.title.toLowerCase().includes(text));
        matches.length > 0 ? resp.json(matches) :
            resp.json({ "message": "no matches found for provided search text" });
    });
}

const handleByColorMatch = app => {
    app.get(`${paintingsRootPath}/color/:name`, (req, resp) => {
        const name = (String(req.params.name)).toLowerCase();

        const matches = paintings.filter(painting => {
            const dominantColors = painting.details.annotation.dominantColors;
            let found = false;

            dominantColors.forEach(color => {
                if(color.name.toLowerCase() == req.params.name.toLowerCase())
                    found = true;
            });

            return found;
        });
        matches.length > 0 ? resp.json(matches) :
            resp.json({ "message": "no matches found for provided color name" });
    });
}

module.exports = {
    handleAll,
    handleByPaintingID,
    handleByGalleryID,
    handleByArtistID,
    handleByYearRange,
    handleByTitleMatch,
    handleByColorMatch
};