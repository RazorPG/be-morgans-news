"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByUsernameOrEmail = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const findUserByUsernameOrEmail = async (identifier) => {
    return await user_model_1.default.findOne({
        $or: [{ username: identifier }, { email: identifier }],
    });
};
exports.findUserByUsernameOrEmail = findUserByUsernameOrEmail;
