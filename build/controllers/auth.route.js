"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.verifyOtp = exports.forgetPassword = exports.me = exports.login = exports.activation = exports.register = void 0;
const user_model_1 = require("../models/user.model");
const auth_service_1 = require("../services/auth.service");
const Yup = __importStar(require("yup"));
const encription_1 = require("../utils/encription");
const user_1 = require("../utils/user");
const jwt_1 = require("../utils/jwt");
const otp_1 = require("../utils/otp");
const response_1 = require("../utils/response");
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        await user_model_1.userDAO.validate(req.body);
        await (0, auth_service_1.createAccount)({ username, email, password });
        return response_1.response.success(res, 'success register account', 200);
    }
    catch (error) {
        if (error.errors) {
            return response_1.response.requestError(res, error.errors[0]);
        }
        else if (error.errorResponse) {
            error.message = 'user is already register';
        }
        return response_1.response.serverError(res, error.message);
    }
};
exports.register = register;
const activation = async (req, res) => {
    try {
        const activationValidate = Yup.object({
            code: Yup.string().required('Code is required'),
        });
        await activationValidate.validate(req.body);
        await (0, auth_service_1.activationAccount)(req.body);
        return response_1.response.success(res, 'success activation account', 203);
    }
    catch (error) {
        if (error.errors) {
            return response_1.response.requestError(res, error.errors[0]);
        }
        return response_1.response.serverError(res, error.message);
    }
};
exports.activation = activation;
const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        await Yup.object({
            identifier: Yup.string().required('Identifier is required'),
            password: Yup.string().required('Password is required'),
        }).validate(req.body);
        const user = (await (0, user_1.findUserByUsernameOrEmail)(identifier));
        if (user.isActive === false) {
            return response_1.response.error(res, 'account not yet activation!', 401);
        }
        if (!(0, encription_1.compareText)(password, user?.password)) {
            return response_1.response.error(res, 'Identifier or password not match!', 401);
        }
        const token = (0, jwt_1.jwtAssign)(user);
        return response_1.response.success(res, 'success login account!', 203, token);
    }
    catch (error) {
        if (error.errors) {
            return response_1.response.requestError(res, error.errors[0]);
        }
        return response_1.response.serverError(res, error.message);
    }
};
exports.login = login;
const me = (req, res) => {
    try {
        const user = res.locals.user;
        if (!user) {
            return response_1.response.unauthorizedError(res);
        }
        return response_1.response.success(res, 'auth me successfully', 200, user);
    }
    catch (error) {
        return response_1.response.serverError(res, error.message);
    }
};
exports.me = me;
const forgetPassword = async (req, res) => {
    try {
        await Yup.object({
            email: Yup.string()
                .required('Email is required')
                .email('invalid email format!'),
        }).validate(req.body);
        const { email } = req.body;
        const codeOTP = (0, otp_1.generateOTP)();
        const user = await (0, auth_service_1.sendOTP)(email, codeOTP);
        if (!user) {
            return response_1.response.error(res, 'user is not found', 404);
        }
        if (user && !user.isActive) {
            return response_1.response.unauthorizedError(res);
        }
        const updatedUser = await (0, user_1.findUserByUsernameOrEmail)(user.email);
        const token = (0, jwt_1.jwtAssign)(updatedUser);
        return response_1.response.success(res, 'kode otp sending to email!', 203, token);
    }
    catch (error) {
        if (error.errors) {
            return response_1.response.requestError(res, error.errors[0]);
        }
        return response_1.response.serverError(res, error.message);
    }
};
exports.forgetPassword = forgetPassword;
const verifyOtp = async (req, res) => {
    try {
        const user = res.locals.user;
        await Yup.object({
            code: Yup.string().required('Code is required'),
        }).validate(req.body);
        const { code } = req.body;
        console.log('otp: ' + code, 'user otp: ' + user.OTP.code);
        if (!(0, encription_1.compareText)(code, user.OTP.code)) {
            return response_1.response.error(res, 'otp not valid!', 403);
        }
        if (new Date(user?.OTP?.expire).getTime() <= Date.now()) {
            return response_1.response.error(res, 'OTP is expired!', 401);
        }
        await (0, auth_service_1.verifyOTP)(user.email);
        return response_1.response.success(res, 'success verify otp', 201);
    }
    catch (error) {
        if (error.errors) {
            return response_1.response.requestError(res, error.errors[0]);
        }
        return response_1.response.serverError(res, error.message);
    }
};
exports.verifyOtp = verifyOtp;
const changePassword = async (req, res) => {
    try {
        const { password } = req.body;
        await Yup.object({
            password: Yup.string()
                .required('Password is required')
                .min(8, 'Password must be at least 8 characters')
                .test({
                name: 'one-number',
                message: 'password must be at least one number',
                test: value => /\d/.test(value),
            })
                .test({
                name: 'one-uppercase',
                message: 'Password must be at least one uppercase',
                test: value => /[A-Z]/.test(value),
            }),
            confirmPassword: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .required('Please confirm your password')
                .oneOf([Yup.ref('password')], 'Passwords do not match'),
        }).validate(req.body);
        const user = res.locals.user;
        if (!user.OTP.isVerify) {
            return response_1.response.forbiddenError(res);
        }
        await (0, auth_service_1.changePasswordUser)(user.email, password);
        return response_1.response.success(res, 'Success change password', 203);
    }
    catch (error) {
        if (error.errors) {
            return response_1.response.requestError(res, error.errors[0]);
        }
        return response_1.response.serverError(res, error.message);
    }
};
exports.changePassword = changePassword;
