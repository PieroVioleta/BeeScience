const router = require('express').Router();
const TermReport = require('../models/termReport');
const CourseReport = require('../models/courseReport');

const user_id = "5ffa6b98f96818c0e006c1a9";

//Parametros: Id del usuario del cual se quiere obtener los reportes de notas
//Devuelve: Los reporte de notas asociados al usuario
router.get('/gradesManager/terms/:id', async(req, res) => {
    const user_id = req.params.id;
    await TermReport.find({user_id: user_id})
        .then(terms => res.json(terms))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Parametros: Id del usuario al cual le pertence el nuevo reporte del ciclo a agregar
//Devuelve: El documento correspondiente al nuevo ciclo agregado
router.post('/gradesManager/terms/add', async(req, res) => {
    const user_id = req.body.user_id;
    const termCode = req.body.termCode;

    const newTerm = new TermReport({
        user_id,
        termCode
    });

    await newTerm.save()
        .then(() => {
            res.json(newTerm);
            console.log('Term added!');
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

// Parametros: Id del reporte del ciclo el cual se desea eliminar
// Devuelve: -
router.delete('/gradesManager/terms/delete/:id', async(req, res) => {
    const _id = req.params.id;
    await TermReport.findByIdAndDelete(_id)
        .then(() => res.json('Term deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
    await CourseReport.deleteMany({termReport_id: _id})
        .then(() => console.log('Linked course reports were deleted'))
});

// Parametros: Id del reporte del ciclo al cual se le desea actualizar la nota del ciclo y la nota del ciclo
// Devuelve: -
router.update('/gradesManager/terms/update/:id',async(req, res) => {
    const _id = req.params.id;
    const termGrade = req.body.termGrade;
    await TermReport.findByIdAndUpdate(_id, {$set: {termGrade}})
        .then(() => res.json('Term grade updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;