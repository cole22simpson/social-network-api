const router = require('express').Router();

const { getAllThoughts,
        getOneThought,
        createThought, 
        updateThought,
        deleteThought,
        addReaction,
        deleteReaction
} = require('../../controllers/thoughtController');

router
.route('/')
.get(getAllThoughts);

router
.route('/:_id')
.post(createThought)
.get(getOneThought)
.put(updateThought) 
.delete(deleteThought);

router
.route('/:thoughtId/reactions')
.post(addReaction);

router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);
 
module.exports = router;