const Sauce= require('../models/saucesModels');

const fs = require('fs');

exports.likeSauce= (req, res, next) =>{
    const likevalue = req.body.like;
    const userId = req.body.userId;
    console.log(req.body)
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            let newUsersLiked = sauce.usersLiked;
            const newUsersDisliked = sauce.usersDisliked;
            if (likevalue == 1)
            {
                newUsersLiked.push(userId)
                const newLikes = newUsersLiked.length
                console.log("newlikes",newLikes,"newUsersLiked",newUsersLiked)
                Sauce.updateOne({_id: req.params.id},{
                    likes: newLikes,
                    usersLiked: newUsersLiked
                })
                .then(()=> res.status(200).json({message: 'sauce likée'}))
                .catch(error => res.status(400).json({error}));
            }
            else if (likevalue == 0)
            {
                const indexToRemoveFromLikes = newUsersLiked.indexOf(userId)
                if (indexToRemoveFromLikes !== -1 ) {newUsersLiked.splice(indexToRemoveFromLikes, 1)}
                const newLikes = newUsersLiked.length
                const indexToRemoveFromDislikes = newUsersDisliked.indexOf(userId)
                if (indexToRemoveFromDislikes !== -1 ) {newUsersDisliked.splice(indexToRemoveFromDislikes,1)}
                console.log("indexdislikes",indexToRemoveFromDislikes,"indexlikes",indexToRemoveFromLikes)
                const newDislikes = newUsersDisliked.length
                Sauce.updateOne({_id: req.params.id},{
                    likes: newLikes,
                    dislikes: newDislikes,
                    usersLiked: newUsersLiked,
                    usersDisliked: newUsersDisliked
                })
                .then(()=> res.status(200).json({message: 'like/dislike supprimé'}))
                .catch(error => res.status(400).json({error}));
            }
            else if (likevalue == -1)
            {
                newUsersDisliked.push(userId)
                const newDislikes = newUsersDisliked.length
                console.log("newdislikes",newDislikes,"newUsersDisliked",newUsersDisliked)
                Sauce.updateOne({_id: req.params.id},{
                    dislikes: newDislikes,
                    usersDisliked: newUsersDisliked
                })
                .then(()=> res.status(200).json({message: 'sauce dislikée'}))
                .catch(error => res.status(400).json({error}));
            }
        })
        .catch(error => res.status(500).json({error}));
};

exports.createSauce = (req, res, next) =>{
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce ({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes : 0,
        dislikes : 0,
        usersLiked : [],
        usersdisLiked : []
    });
    sauce.save()
    .then(() => res.status(201).json({message: 'objet enregistré'}))
    .catch(error => res.status(400).json({error}));
};

exports.modifySauce =  (req, res, next) =>{
    Sauce.findOne({ _id: req.params.id})
        .then( sauce => {
            if (req.file != undefined)
            {
                const filename = sauce.imageUrl.split('/images')[1]
                console.log('image à supprimer',filename);
                fs.unlink(`images/${filename}`, (err => {
                    if (err) console.log(err);
                    else {
                        //console.log(filename, "deleted");
                    }
                }));
            }
            const sauceObject = req.file ?
            {
                ...JSON.parse(req.body.sauce),
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : {...req.body};

            Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
                .then(()=> res.status(200).json({message: 'objet modifié'}))
                .catch(error => res.status(400).json({error}));
        })
    .catch(error => res.status(500).json({error}))
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then( sauce => {
            const filename = sauce.imageUrl.split('/images')[1]
            fs.unlink(`images/${filename}`, ()=> {
                Sauce.deleteOne({_id: req.params.id})
                    .then(() => res.status(200).json({ message: 'sauce supprimée'}))
                    .catch(error => res.status(404).json({error}));
            })
        })
        .catch(error => res.status(500).json({error}));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({error}));
};

exports.getSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({error}));
};