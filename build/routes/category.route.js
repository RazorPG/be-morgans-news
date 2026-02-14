"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const categoryRouter = (0, express_1.Router)();
categoryRouter.route('/').post(category_controller_1.createCategory);
exports.default = categoryRouter;
