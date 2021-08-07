const Thing = require('../models/thing');
const fs = require('fs');

exports.createThing = (req, res, next) => {
  console.log(req.body.sauce);
  const thingObject = JSON.parse(req.body.sauce);
  const thing = new Thing({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => { res.status(200).json(thing); })
    .catch((error) => { res.status(404).json({ error: error
    });
  });
};

exports.modifyThing = (req, res, next) => {
  const thingObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Thing.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllStuff = (req, res, next) => {
  Thing.find().then(
    (things) => { res.status(200).json(things); })
    .catch((error) => { res.status(400).json({ error: error });
    });
};

exports.isLiked = (req, res, next) => {
  const userId = req.body.userId

  switch (req.body.like)
   {
    case 0: 
      Thing.findOne({ _id: req.params.id })
        .then(thing => {
          const liked = thing.usersLiked.find(element => element == userId);  
          const disliked = thing.usersDisliked.find(element => element == userId);
          if (liked) {
            Thing.updateOne({_id: req.params.id}, {$pull: {usersLiked: userId}, $inc: {likes: -1}})
              .then(() => res.status(201).json({ message: "like removed" }))
              .catch(error => res.status(400).json({ error }));
          } else if (disliked) {
            Thing.updateOne({_id: req.params.id}, {$pull: {usersDisliked: userId}, $inc: {dislikes: -1}})
              .then(() => res.status(201).json({ message: "dislike removed" }))
              .catch(error => res.status(400).json({ error }));
          }
      });
      break;
    
    case 1: 
      Thing.updateOne({_id: req.params.id}, {$push: {usersLiked: userId}, $inc: {likes: 1}})
        .then(() => res.status(201).json({ message: "liked" }))
        .catch(error => res.status(400).json({ error }));
      break;

    case -1: 
      Thing.updateOne({_id: req.params.id}, {$push: {usersDisliked: userId}, $inc: {dislikes: 1}})
        .then(() => res.status(201).json({ message: "disliked" }))
        .catch(error => res.status(400).json({ error }));
    break;    
    }
}