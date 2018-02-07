const utils = require('../config/utils');
const ResponseTemplate = require('../errorTemplates/index');

let validateId = (req, res, next) => {
    if (req.method === 'GET') {
        let id = req.params.id;
        if (!id || !utils.checkforId(id)) {
            res.json(ResponseTemplate.errorContent());
        } else {
            next()
        }
    } else {
        next();
    }
}

module.exports = validateId;
