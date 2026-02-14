"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const auth_route_1 = __importDefault(require("./auth.route"));
const category_route_1 = __importDefault(require("./category.route"));
const article_route_1 = __importDefault(require("./article.route"));
const _routes = [
    { prefix: '/api/auth', router: auth_route_1.default },
    { prefix: '/api/categories', router: category_route_1.default },
    { prefix: '/api/articles', router: article_route_1.default },
];
function default_1(app) {
    _routes.forEach(route => {
        app.use(route.prefix, route.router);
    });
}
