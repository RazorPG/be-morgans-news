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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDAO = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Yup = __importStar(require("yup"));
const encription_1 = require("../utils/encription");
const mail_1 = require("../utils/mail/mail");
const bcrypt_1 = require("bcrypt");
const environments_1 = require("../utils/environments");
const Schema = mongoose_1.default.Schema;
exports.userDAO = Yup.object({
    username: Yup.string()
        .required('Username is required')
        .min(6, 'Username must be at least 6 characters'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
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
});
const userSchema = new Schema({
    username: {
        type: Schema.Types.String,
        require: true,
        unique: true,
    },
    email: {
        type: Schema.Types.String,
        require: true,
        unique: true,
    },
    password: {
        type: Schema.Types.String,
        require: true,
    },
    isActive: {
        type: Schema.Types.Boolean,
        default: false,
    },
    role: {
        type: Schema.Types.String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    profilePicture: {
        type: Schema.Types.String,
        default: 'user.png',
    },
    OTP: {
        code: Schema.Types.String,
        isVerify: Schema.Types.Boolean,
        expire: Schema.Types.Date,
    },
    activationCode: Schema.Types.String,
}, { timestamps: true });
userSchema.pre('save', function () {
    const user = this;
    user.password = (0, encription_1.hashText)(user.password);
    user.activationCode = (0, bcrypt_1.hashSync)(`${user.username}-${user._id}`, 10);
});
userSchema.post('save', (doc) => {
    const template = (0, mail_1.createContentHtmlSendMail)('activationCode.ejs', {
        user: doc.username,
        email: doc.email,
        createdAt: doc.createdAt,
        linkActivate: `${environments_1.CLIENT_HOST}?activationCode=${doc.activationCode}`,
    });
    (0, mail_1.sendMail)('Aktivasi Akun Anda', template, doc);
});
userSchema.post('findOneAndUpdate', async function (doc) {
    const opts = this.getOptions ? this.getOptions() : {};
    const hook = opts.hookType;
    if (!hook)
        return;
    const handlers = {
        resetPassword: async (doc) => {
            const template = (0, mail_1.createContentHtmlSendMail)('otp.ejs', {
                user: doc.username,
                OTP: doc.OTP.code,
            });
            (0, mail_1.sendMail)('Reset Password', template, doc);
            await userModel
                .findOneAndUpdate({ _id: doc._id }, {
                $set: {
                    'OTP.code': (0, encription_1.hashText)(doc.OTP.code),
                },
            }, { new: true })
                .exec();
        },
        changePassword: async (doc) => {
            await userModel.collection.updateOne({ _id: doc._id }, {
                $set: {
                    'OTP.isVerify': false,
                },
            });
        },
    };
    const fn = handlers[hook];
    if (fn) {
        try {
            await fn(doc);
        }
        catch (e) {
            console.log(e.message);
        }
    }
});
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.activationCode;
    delete user.OTP;
    return user;
};
const userModel = mongoose_1.default.model('user', userSchema);
exports.default = userModel;
