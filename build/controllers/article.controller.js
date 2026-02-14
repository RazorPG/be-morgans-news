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
exports.getArticles = exports.createArticle = void 0;
const article_model_1 = __importStar(require("./../models/article.model"));
const article_service_1 = require("../services/article.service");
const response_1 = require("../utils/response");
const category_service_1 = require("../services/category.service");
const createArticle = async (req, res) => {
    try {
        await article_model_1.articleDAO.validate(req.body);
        const { category } = req.body;
        const categoryDB = await (0, category_service_1.getCategoryBySlug)(category);
        if (!categoryDB?.slug) {
            return response_1.response.error(res, 'categories is not available', 403);
        }
        const user = res.locals.user;
        await (0, article_service_1.createArticleDB)({
            ...req.body,
            authorId: user._id,
            categoryId: categoryDB._id,
        });
        return response_1.response.success(res, 'success create article', 200);
    }
    catch (error) {
        if (error.errors) {
            return response_1.response.requestError(res, error.errors[0]);
        }
        return response_1.response.serverError(res, error.message);
    }
};
exports.createArticle = createArticle;
const getArticles = async (req, res) => {
    try {
        const { page = 1, limit = 2, search } = req.query;
        const query = {};
        if (search) {
            Object.assign(query, {
                $or: [
                    {
                        title: { $regex: search, $options: 'i' },
                    },
                    {
                        description: { $regex: search, $options: 'i' },
                    },
                    {
                        body: { $regex: search, $options: 'i' },
                    },
                ],
            });
        }
        const articles = (await (0, article_service_1.getArticlesDB)(Number(limit), Number(page), query));
        console.log(articles);
        const countData = await article_model_1.default.countDocuments();
        return response_1.response.pagination(res, 'success get articles', articles, {
            current: Number(page),
            totalPages: Math.ceil(countData / Number(limit)),
            total: countData,
        });
    }
    catch (error) {
        return response_1.response.serverError(res, error.message);
    }
};
exports.getArticles = getArticles;
