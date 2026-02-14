"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const article_controller_1 = require("../controllers/article.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const articleRouter = (0, express_1.Router)();
articleRouter
    .route('/')
    .get(article_controller_1.getArticles)
    .post(auth_middleware_1.isUseSession, auth_middleware_1.isRoleAdmin, article_controller_1.createArticle);
exports.default = articleRouter;
