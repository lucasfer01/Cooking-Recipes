const {
    Router
} = require('express');
const {
    Recipe,
    Diet
} = require('../db');

const router = Router();

/* ----------------------- GET ----------------------- */

router.get('/', (req, res, next) => {
    Recipe.findAll({include: Diet})
          .then(response => res.send(response))
          .catch(err => next(err))

});
    
module.exports = router