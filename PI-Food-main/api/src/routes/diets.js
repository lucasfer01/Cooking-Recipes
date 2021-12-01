const {
    Router
} = require('express');
const {
    Diet
} = require('../db');

const router = Router();

/* ----------------------- GET ----------------------- */

router.get('/', (req, res, next) => {
    return Diet.findAll()
        .then(response => res.send(response))
        .catch(error => next(error));
});

router.get('/:id', (req, res, next) => {
    const {id} = req.params;

    return Diet.findByPk(id)
            .then(response => res.send(response))
            .catch(error => next(error));
});

/* ----------------------- POST ----------------------- */

router.post('/', (req, res, next) => {
    const diet = req.body;

    return Diet.create({
        name: diet.name.toLowerCase()
    }).then(response => res.send(response))
      .catch(error => next(error));
});

/* ----------------------- PUT ----------------------- */

router.put('/:id', (req, res, next) => {
    const {id} = req.params;
    const dietData = req.body;

    return Diet.update({
        ...dietData
    },{
        where: {
            id
        }
    }).then(response => res.send(response))
      .catch(error => next(error));
});

/* ----------------------- DELETE ----------------------- */

router.delete('/:id', (req, res, next) => {
    const {id} = req.params;

    return Diet.destroy({
        where: {
            id
        }
    }).then(response => res.sendStatus(200))
      .catch(error => next(error));
});

module.exports = router;