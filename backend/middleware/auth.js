const jwt = require('jsonwebtoken');
const secretKey = process.env.TOKEN_SECRETE_KEY;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, secretKey);
        const userId = decodedToken.userId;

        if (req.body.userId && req.body.userId !== userId){
            throw 'User Id non valable';
        } else {
            /*Ce middleware est utilisé par d'autres middlewares avant de faire quoi que se soit. si l'authentification rate,
                        alors il bloque le processus. Sinon il passe au middleware suivant.*/
            next();
        }
    } catch (error) {
        res.status(401).json({error});
    }
};