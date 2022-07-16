const { User, Thoughts } = require('../models');

const userController = {
   //get all
   getAllUser(req, res) {
    User.find({})
    .select('-__v')
    //  .populate({
    //     //path: 'thoughts',
    //     select: '-__v'
    //  })
    .populate('thoughts')
     .sort({ _id: -1 })
     .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
   },
   //get one
   getUserById({ params }, res) {
    User.findOne({ _id: params.id })
    .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this Id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
   //create
    createUser({ body}, res) {
        User.create(body)
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
    },
   //update
   updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this Id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
   },
   //delete 
   deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: "No user found with this Id"});
            return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
   },

  // add friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $addToSet: { friends: params.friendsId } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  //delete friend
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendsId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "no user found with this Id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;