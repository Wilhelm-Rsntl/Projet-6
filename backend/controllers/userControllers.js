const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.TOKEN_SECRETE_KEY;
const User = require('../models/userModels');
const passwordValidator = require('password-validator');
const schemaPassword = require("../models/passwordModels")

exports.signup = (req, res, next) => {
    const passwordValidation = schemaPassword.validate(req.body.password)
    if (passwordValidation === true)
    {
        bcrypt.hash(req.body.password, 10)
        .then( hash => {
            const user = new User ({
                email:req.body.email,
                password: hash
            });
            user.save()
            .then(() => res.status(201).json({message: 'Utilisateur créé dans la base de données'}))
            .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
    }
    else
    {
        const error = schemaPassword.validate(req.body.password, { list: true })
        res.status(428).json({error});
    }
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if(!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé'});
        }
        bcrypt.compare(req.body.password, user.password)
        .then( valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe invalide'})
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },

                    secretKey,

                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status.status(500).json({ error }))
};