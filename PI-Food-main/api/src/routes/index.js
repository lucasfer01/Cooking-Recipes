const axios = require('axios').default;
const {
  Router
} = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRouter = require('./recipes');
const recipeRouter = require('./recipe');
const dietRouter = require('./diets');

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

      const recipesApi = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100`);

      return Promise.all([recipesDb, recipesApi])
        .then(response => {
            const [recipeDbResult, recipeApiResult] = response;

            const result = [...recipeDbResult, ...recipeApiResult.data.results];

            if (name) {
              const resultFilter = result.filter(x => {
                if (x.name) {
                  if (x.name.toLowerCase().includes(name)) {
                    return x;
                  }
                } else {
                  if (x.title.toLowerCase().includes(name)) {
                    return x;
                  }
                }
              });

              return resultFilter.length ? res.send(resultFilter) : (res.statusMessage = 'error404', res.status(404).send('Recipe not found'));
              }

              return res.send(result);

            })
          .catch(error => next(error))
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