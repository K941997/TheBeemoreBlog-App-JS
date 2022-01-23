const jwt = require("jsonwebtoken");

const generateActiveToken = (id) => {
    return jwt.sign(id, `${process.env.ACTIVE_TOKEN_JWT_KEY}`, {expiresIn: "1h"})
}

const generateAccessToken = (id) => {
    return jwt.sign(id, `${process.env.ACCESS_TOKEN_JWT_KEY}`, {expiresIn: "1h"})
}

const generateRefreshToken = (id) => {
    return jwt.sign(id, `${process.env.REFRESH_TOKEN_JWT_KEY}`, {expiresIn: "1h"})
}

module.exports = {
    generateActiveToken,
    generateAccessToken,
    generateRefreshToken,
}