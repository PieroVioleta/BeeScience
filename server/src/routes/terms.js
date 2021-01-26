const router = require('express').Router();
const TermReport = require('../models/termReport');
const CourseReport = require('../models/courseReport');

//Parametros: Id del usuario del cual se quiere obtener los reportes de notas
//Devuelve: Los reporte de notas asociados al usuario
router.get('/:id', async(req, res) => {
    const user_id = req.params.id;
    await TermReport.find({user_id: user_id})
        .then(terms => res.json(terms))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Parametros: Id del usuario al cual le pertence el nuevo reporte del ciclo a agregar
//Devuelve: El documento correspondiente al nuevo ciclo agregado
router.post('/add', async(req, res) => {
    const user_id = req.body.user_id;
    const termCode = req.body.termCode;

    const newTerm = new TermReport({
        user_id,
        termCode
    });

    await newTerm.save()
        .then(() => {
            res.json(newTerm);
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

// Parametros: Id del reporte del ciclo el cual se desea eliminar
// Devuelve: -
router.delete('/delete/:id', async(req, res) => {
    const _id = req.params.id;
    await TermReport.findByIdAndDelete(_id)
        .then(() => res.json('Term deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
    await CourseReport.deleteMany({termReport_id: _id})
        .then(() => console.log('Linked course reports were deleted'))
});


// Parametros: Id del reporte del ciclo al cual se le desea actualizar la nota del ciclo y la nota del ciclo
// Devuelve: -
router.post('/update/:id',async(req, res) => {
    const _id = req.params.id;
    const termGrade = req.body.termGrade;
    await TermReport.findByIdAndUpdate(_id, {$set: {termGrade}})
        .then(() => res.json('Term grade updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;