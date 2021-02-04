const router = require('express').Router();

const Escuelas = require('../models/escuelas');

router.get('/', async(req, res) => {
    await Escuelas.find()
        .then(terms => res.json(terms))
        .catch(err => res.status(400).json('Error: ' + err));
    
});



router.get('/:id', async(req, res) => {
    const id = req.params.id;
    await Escuelas.find({escuela:id})
        .then(terms => res.json(terms))
        .catch(err => res.status(400).json('Error: ' + err));

});



module.exports = router;