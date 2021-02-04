const router = require('express').Router();

const Question = require('../models/question');
const { route } = require('./grades');

router.get('/', async(req, res) => {
    await Question.find()
        .then(question => res.json(question))
        .catch(err => res.status(400).json('Error: ' + err));
});

// const question = new Schema({
//     user_id: String,
//     questionText: String,
//     comments: {
//         type: [],
//         default: []
//     } 
// });

router.post('/add/:user_id', async(req, res) => {
    const user_id = req.params.user_id;
    const questionText = req.body.questionText;
    const newQuestion = new Question({
        user_id,
        questionText,
        comments : []
    });

    await newQuestion.save()
        .then(() => {
            res.json(newQuestion);
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

router.get('/getQuestion/:id', async(req, res) => {
    const id = req.params.id;
    await Question.findById(id)
        .then(question => res.json(question))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/addComment/:id', async(req, res) => {
    // const questionText = req.body.questionText; 
    const _id = req.params.id
    const comment = req.body.comment;
    await Question.updateOne({_id}, {$addToSet: {comments: comment}})
                .then(() => res.json('comment added'))
                .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;