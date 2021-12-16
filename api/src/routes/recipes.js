const axios = require('axios').default;
const {
    Router
} = require('express');
const {
    Recipe,
    Diet
} = require('../db');
const {API_KEY} = process.env;

const router = Router();

/* ----------------------- GET ----------------------- */

// router.get('/', (req, res, next) => {
//     return Recipe.findAll()
//         .then(response => res.send(response))
//         .catch(error => next(error));
// });

router.get('/:id', (req, res, next) => {
    const {
        id
    } = req.params;

    return axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
        .then(response => res.send(response.data))    
        .catch(error => {
                Recipe.findByPk(id,{include: Diet})
                .then(response => res.send(response))
                .catch(error => next(error))
        });
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