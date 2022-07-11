const { Thought } = require('../models');

const thoughtController = {

  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
      path: 'reactions',
      select: '-__v'})
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
       console.log(err);
       res.status(400).json(err);
     });
  },

  getOneThought({ params }, res) {
    Thought.findOne({ _id: params.id })
    .populate({
    path: 'reactions',
    select: '-__v'})
    .select('-__v')
    .then(dbThoughtData => {
      if(!dbThoughtData) {
        res.status(404).json({message: 'No thought with that id!'});
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });

  },

  createThought({ body }, res) {
    Thought.create(body)
    .then(dbThoughtData =>
      res.json(dbThoughtData))
    .catch(err => res.json(err)); 
},

    updateThought({ params, body }, res) {
       Thought.findOneAndUpdate(
          { _id: params.id }, body, { new: true, runValidators: true })
          .then(dbThoughtData => {
             if (!dbThoughtData) {
                 res.status(404).json({ message: 'No thought with that id!' });
                 return;
             }
             res.json(dbThoughtData);
         })
         .catch(err => res.json(err))
    },

 deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({message: 'No thought with that id.' });
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
    },

addReaction({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, { $push: { reactions: body } }, { new: true, runValidators: true })
      .then(dbThoughtData => {
      res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err))
  }, 

deleteReaction({ params }, res) {
  Thought.findOneAndUpdate({ _id: params.thoughtId }, { $pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No reaction found with that id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
  }
};

module.exports = thoughtController;