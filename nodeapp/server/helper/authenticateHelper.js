var jwt = require('jsonwebtoken');
module.exports = {
    authenticateUser: (req, res, next) => {
        var JWToken = process.env.JWToken;
        jwtokenHeader = req.headers.authorization.split(" ")[1];

        jwt.verify(jwtokenHeader, JWToken, function(err, decoded) {
            if(!err && decoded.username) {
                req.user = decoded;
                next();
            }
            else {
                console.log(err);
                res.status(400).json({"error":1, "message": "Unable to authenticate"});
            }
        });
    }
}