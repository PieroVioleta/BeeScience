const router = require('express').Router();
const taskReport = require('../models/taskReport')

//Parametros: Id del usuario del cual se quiere obtener los reportes de notas
//Devuelve: Los reporte de notas asociados al usuario
router.get('/:id', async(req, res) => {
    const userId = req.params.id
    await taskReport.find({user_id:userId})
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Parametros: Id del usuario al cual le pertence el nuevo reporte del ciclo a agregar
//Devuelve: El documento correspondiente al nuevo ciclo agregado
router.post('/add', async(req, res) => {
    const user_id = req.body.user_id;
    const name = req.body.name ;
    const initialDate = req.body.initialDate;
    const endDate = req.body.endDate;
    const priority = req.body.priority;

    const newTask = new taskReport({
        user_id,
        initialDate,
        endDate,
        name,
        priority

    });

    await newTask.save()
        .then(() => {
            res.json(newTask);
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

router.delete('/delete/:id', async(req, res) => {
    const user_id = req.params.id;
    await taskReport.findOneAndDelete({user_id})
        .then(() => res.json('Task deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});




router.post('/update/:id',async(req, res) => {
    const _id = req.params.id;  // id del task
    
    const name = req.body.name;
    const priority = req.body.priority;
    const initialDate = req.body.initialDate;
    const endDate = req.body.endDate;
    await TaskReport.findByIdAndUpdate(_id, {$set: {name,priority,initialDate,endDate}})
        .then(() => res.json('Task updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;