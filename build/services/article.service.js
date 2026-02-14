"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticlesDB = exports.createArticleDB = void 0;
const article_model_1 = __importDefault(require("../models/article.model"));
const createArticleDB = async (payload) => {
    await article_model_1.default.create(payload);
};
exports.createArticleDB = createArticleDB;
const getArticlesDB = async (limit, page, query) => {
    return await article_model_1.default
        .find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .exec();
};
exports.getArticlesDB = getArticlesDB;
