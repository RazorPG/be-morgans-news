"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decentralizedToken = void 0;
const jwt_1 = require("../utils/jwt");
const decentralizedToken = (req, res, next) => {
    let token = '';
    if (req?.headers?.authorization) {
        token = req.headers.authorization.split(' ')[1] || '';
    }
    if (token === '') {
        return next();
    }
    try {
        const accessToken = (0, jwt_1.jwtVerify)(token);
        res.locals.user = accessToken._doc;
        return next();
    }
    catch (error) {
        return next();
    }
};
exports.decentralizedToken = decentralizedToken;
