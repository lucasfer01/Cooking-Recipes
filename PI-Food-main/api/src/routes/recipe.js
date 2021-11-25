const {Recipe} = require('../db');
const {Router} = require('express');

const router = Router();

/* ----------------------- POST ----------------------- */

router.post('/', (req, res, next) => {
    const recipe = req.body;

    return Recipe.create({
        ...recipe
    })
    .then(response => res.send(response))
    .catch(error => next(error))
});

module.exports = router;