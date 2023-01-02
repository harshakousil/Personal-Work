const { sign, verify } = require("jsonwebtoken");
const createTokens = (email) => {
    const accessTokens = sign(email, `${process.env.SECRET}`);
    return accessTokens;
};
const getToken = (req) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    return token;
};
const verifyToken = (token) => {
    try {
        const isValid = verify(token, `${process.env.SECRET}`);
        if (isValid) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
};
module.exports = { createTokens, getToken, verifyToken };






