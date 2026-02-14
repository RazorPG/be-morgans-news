"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordUser = exports.verifyOTP = exports.sendOTP = exports.activationAccount = exports.createAccount = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const encription_1 = require("../utils/encription");
const createAccount = async (payload) => {
    return await user_model_1.default.create(payload);
};
exports.createAccount = createAccount;
const activationAccount = async (payload) => {
    return await user_model_1.default.findOneAndUpdate({ activationCode: payload.code }, {
        $set: {
            isActive: true,
        },
    }, { new: true });
};
exports.activationAccount = activationAccount;
const sendOTP = async (email, otp) => {
    return await user_model_1.default.findOneAndUpdate({ email }, { $set: { OTP: otp } }, { new: true, hookType: 'resetPassword' });
};
exports.sendOTP = sendOTP;
const verifyOTP = async (email) => {
    return await user_model_1.default.findOneAndUpdate({ email }, {
        $set: {
            'OTP.isVerify': true,
        },
    }, { new: true });
};
exports.verifyOTP = verifyOTP;
const changePasswordUser = async (email, password) => {
    return await user_model_1.default.findOneAndUpdate({ email }, {
        $set: {
            password: (0, encription_1.hashText)(password),
        },
    }, { new: true, hookType: 'changePassword' });
};
exports.changePasswordUser = changePasswordUser;
