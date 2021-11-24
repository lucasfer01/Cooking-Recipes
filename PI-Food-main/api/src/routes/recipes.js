const {
    Router
} = require('express');
const {
    Recipe
} = require('../db');

const router = Router();

/* ----------------------- GET ----------------------- */

router.get('/', (req, res, next) => {
    return Recipe.findAll()
        .then(response => res.send(response))
        .catch(error => next(error));
});

router.get('/:id', (req, res, next) => {
    const {
        id
    } = req.params;

    return Recipe.findByPk(id)
        .then(response => res.send(response))
        .catch(error => next(error));
});

/* ----------------------- POST ----------------------- */

router.post('/', (req, res, next) => {
    const recipe = req.body;

    return Recipe.create({
        ...recipe
    })
        .then(response => res.send(response))
        .catch(error => next(error))
});

/* ----------------------- PUT ----------------------- */

router.put('/:id', (req, res, next) => {
    const {id} = req.params;
    const recipeData = req.body;

    return Recipe.update({
        ...recipeData
    }, {
        where: {
            id
        }
    })
    .then(response => res.send(response))
    .catch(error => next(error));
});

/* ----------------------- DELETE ----------------------- */

router.delete('/:id', (req, res, next) => {
    const {id} = req.params;
    
    return Recipe.destroy({
        where: {
            id
        }
    })
    .then(response => res.sendStatus(200))
    .catch(error => next(error));
});

module.exports = router;