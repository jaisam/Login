const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.header.authorization.split(" ")[1]; //token needs to be sent in header, format of token - 'Bearer token'
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        console.log('JWT verify failed')
        return res.status(401).json({ msg: "Incorrect Email or Password" });
    }
}