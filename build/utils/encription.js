"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareText = exports.hashText = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashText = (password) => {
    return bcrypt_1.default.hashSync(password, 10);
};
exports.hashText = hashText;
const compareText = (password, userPassword) => {
    return bcrypt_1.default.compareSync(password, userPassword);
};
exports.compareText = compareText;
