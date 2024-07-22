const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET, {expiresIn: '24hrs'});
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    }catch (err) {
        return console.log(err.message);
    }
};

module.exports = { generateToken, verifyToken };