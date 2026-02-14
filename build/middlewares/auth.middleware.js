"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRoleAdmin = exports.isUseSession = exports.isSession = void 0;
const response_1 = require("../utils/response");
const isSession = (req, res, next) => {
    if (res.locals.user) {
        return res.status(403).json({
            meta: {
                status: 403,
                message: 'Session already exists',
            },
        });
    }
    return next();
};
exports.isSession = isSession;
const isUseSession = (req, res, next) => {
    if (!res.locals.user) {
        return res.status(403).json({
            meta: {
                status: 403,
                message: 'No session yet',
            },
        });
    }
    return next();
};
exports.isUseSession = isUseSession;
const isRoleAdmin = (req, res, next) => {
    if (res.locals?.user?.role !== 'admin') {
        return response_1.response.forbiddenError(res);
    }
    return next();
};
exports.isRoleAdmin = isRoleAdmin;
