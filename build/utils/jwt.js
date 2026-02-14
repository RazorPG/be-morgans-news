"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerify = exports.jwtAssign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environments_1 = require("./environments");
const jwtAssign = (payload) => {
    return jsonwebtoken_1.default.sign({ ...payload }, environments_1.SECRET_JWT, {
        expiresIn: '1d',
    });
};
exports.jwtAssign = jwtAssign;
const jwtVerify = (token) => {
    return jsonwebtoken_1.default.verify(token, environments_1.SECRET_JWT);
};
exports.jwtVerify = jwtVerify;
