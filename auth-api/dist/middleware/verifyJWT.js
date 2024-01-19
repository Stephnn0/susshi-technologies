"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader)
        return res.sendStatus(401);
    const tokenArray = Array.isArray(authHeader) ? authHeader : [authHeader];
    const token = tokenArray.find(header => header.startsWith('Bearer '));
    if (!token)
        return res.sendStatus(401);
    const tokenValue = token.split(' ')[1];
    jwt.verify(tokenValue, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err)
            return res.sendStatus(403);
        req.email = decoded.UserInfo.email;
        req.roles = decoded.UserInfo.roles;
        next();
    });
};
exports.default = verifyJWT;
//# sourceMappingURL=verifyJWT.js.map