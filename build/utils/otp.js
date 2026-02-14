"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
const generateOTP = () => {
    const otp = String(Math.floor(Math.random() * 900000) + 100000);
    const expireTime = new Date(Date.now() + 5 * 60 * 1000);
    return {
        code: otp,
        isVerify: false,
        expire: expireTime,
    };
};
exports.generateOTP = generateOTP;
