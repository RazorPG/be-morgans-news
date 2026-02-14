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
exports.articleDAO = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Yup = __importStar(require("yup"));
const Schema = mongoose_1.default.Schema;
exports.articleDAO = Yup.object({
    title: Yup.string()
        .required()
        .min(5, 'Title must be at least 5 characters')
        .max(30),
    description: Yup.string()
        .required()
        .min(10, 'Description must be at least 10 characters')
        .max(30),
    body: Yup.string()
        .required()
        .min(100, 'body must be at least 20 characters')
        .max(10000),
    image: Yup.string().required(),
    category: Yup.string().required(),
    isHeadline: Yup.boolean(),
});
const articleSchema = new Schema({
    title: {
        require: true,
        type: Schema.Types.String,
    },
    description: {
        require: true,
        type: Schema.Types.String,
    },
    body: {
        require: true,
        type: Schema.Types.String,
    },
    image: {
        require: true,
        type: Schema.Types.String,
    },
    isHeadline: {
        require: true,
        type: Schema.Types.Boolean,
        default: false,
    },
    categoryId: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'category',
    },
    authorId: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
}, { timestamps: true });
const articleModel = mongoose_1.default.model('article', articleSchema);
exports.default = articleModel;
