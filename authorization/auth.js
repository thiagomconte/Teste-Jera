const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) {
        res.status(401).json("Não autorizado");
    } else {
        token = token.split(" ");
        jwt.verify(token[1], process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json("Não autorizado");
            } else {
                let user = await User.findById(decoded.id);

                if (!user) {
                    return res.status(401).json("Não autorizado");
                } else {
                    req.decoded = decoded;
                    next();
                }
            }
        });
    }
};