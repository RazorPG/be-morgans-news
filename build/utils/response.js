"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
exports.response = {
    success: (res, message, status, data) => {
        return res.status(status).json({
            meta: {
                status,
                message,
            },
            data,
        });
    },
    pagination: (res, message, data, pagination) => {
        return res.status(200).json({
            meta: {
                status: 200,
                message,
            },
            data,
            pagination,
        });
    },
    unauthorizedError: (res) => {
        return res.status(401).json({
            meta: {
                status: 401,
                message: 'Unauthorized: Invalid or missing authentication credentials',
            },
        });
    },
    forbiddenError: (res) => {
        return res.status(403).json({
            meta: {
                status: 403,
                messsage: 'Forbidden: You do not have permission to access this resource',
            },
        });
    },
    requestError: (res, message) => {
        return res.status(400).json({
            meta: {
                status: 400,
                message: message ? `Bad request: ${message}` : 'Bad request',
            },
        });
    },
    serverError: (res, message) => {
        return res.status(500).json({
            meta: {
                status: 500,
                message: 'server is crashed: ' + message,
            },
        });
    },
    error: (res, message, status) => {
        return res.status(status).json({
            meta: {
                status,
                message,
            },
        });
    },
};
