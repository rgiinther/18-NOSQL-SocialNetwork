const { User, Thoughts} = require('../models');

const ThoughtController = {
    //get all
    getAllThoughts(req, res) {
        Thoughts.find({})
         .select('-__v')
         .sort({ _id: -1 })
         .then (dbThoughtsData => res.json(dbThoguhtsData))
            .catch((err) => {
                res.sendStatus(400);
            });
    },
    //get one
    getThoughtsById({ params }, res) {
        Thoughts.findOne({ _id: params.id})
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ messafe: 'There is no Thought found with this Id.'});
                return;
            }
            res.json(dbThoguhtsData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //create
    createThoughts({ body }, res) {
        Thoughts.create(body)
        .then(dbThoguhtsData => res.json(dbThoguhtsData))
        .catch(err => res.json(err));
    }, 
    //update
    updateThoughts({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbThoguhtsData => {
            if (!dbThoguhtsData) {
                res.status(404).json({ message: 'There is no Thought found with this Id.'});
                return;
            }
            res.json(dbThoguhtsData);
          })
          .catch(err => res.status(400).json(err));
    },
    //delete
    deleteThoughts({ params }, res){
        Thoughts.findOneAndDelete({ _id: params.id })
          .then(dbThoguhtsData => {
            if (!dbThoguhtsData) {
                res.status(404).json({ messages: 'There is no Thought found with this Id.'});
                return;
            }
            res.json(dbThoguhtsData);
          })
          .catch(err => res.status(400).json(err));
    },

//add reaction
addReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtsId },
      { $addToSet: { reactions: body } },
      { new: true }
    )
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res
            .status(404)
            .json({ message: "There is no thought found with this Id." });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.json(err));
  },

//delete reaction 
deleteReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtsId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtsData) => res.json(dbThoughtsData))
      .catch((err) => res.json(err));
  },
};

module.exports = ThoughtController;