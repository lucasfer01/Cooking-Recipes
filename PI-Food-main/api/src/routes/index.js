const axios = require('axios').default;
const {
  Router
} = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRouter = require('./recipes');
const recipeRouter = require('./recipe');
const dietRouter = require('./diets');
const createdRecipes = require('./createdRecipes')

const {
  Recipe,
  Diet
} = require('../db');
const {
  API_KEY
} = process.env;


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/createdRecipes', createdRecipes)
router.use('/recipes', recipesRouter);
router.use('/recipe', recipeRouter)
router.use('/types', dietRouter);


/* -----------------------------GET--------------------------------- */

router.get('/recipes', (req, res, next) => {
const {
name
} = req.query;

const recipesDb = Recipe.findAll({
include: Diet
});

const recipesApi = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)


Promise.all([recipesDb, recipesApi])
  .then(response => {
    const [db, api] = response;
    
    const result = [...db, ...api.data.results];

    if(name) {
      const resultFilter = result.filter(x => {
        return (x.title || x.name).toLowerCase().includes(name.toString().toLowerCase());
      });

      return resultFilter.length ? res.send(resultFilter) : (res.statusMessage = 'error404', res.status(404).send('Recipe not found'));
    }

    return res.send(result);
  });    
});

    /* -----------------------------POST--------------------------------- */

    router.post('/:recipeId/:dietId', (req, res, next) => {
      const {
        recipeId,
        dietId
      } = req.params;

      Recipe.findByPk(recipeId)
        .then(response => {
          return response.addDiets(dietId);
        })
        .then(response => res.sendStatus(200))
        .catch(error => next(error));

    });

    module.exports = router;