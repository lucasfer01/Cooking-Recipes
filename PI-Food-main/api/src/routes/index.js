const axios = require('axios').default;
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipeRouter = require('./recipes');
const dietRouter = require('./diets');

const { Recipe, Diet } = require('../db');
const {API_KEY} = process.env;


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipeRouter);
router.use('/diets', dietRouter);

router.get('/', (req, res, next) => {
    const recipesDb = Recipe.findAll({
        include: Diet
    });
    const recipesApi = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=2`);

    return Promise.all([recipesDb, recipesApi])
            .then(response => {
                const [recipeDbResult, recipeApiResult] = response;

                const result = [...recipeDbResult, ...recipeApiResult.data.results];

                res.send(result);
            })
            .catch(error => next(error))
});

router.post('/:recipeId/:dietId', (req, res, next) => {
    const { recipeId, dietId } = req.params;

    Recipe.findByPk(recipeId)
    .then(response => {
        return response.addDiets(dietId);
    })
    .then(response => res.sendStatus(200))
    .catch(error => next(error));

});

module.exports = router;
