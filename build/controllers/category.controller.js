"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = exports.createCategory = void 0;
const category_model_1 = require("../models/category.model");
const category_service_1 = require("../services/category.service");
const response_1 = require("../utils/response");
const createCategory = async (req, res) => {
    try {
        await category_model_1.categoryDAO.validate(req.body);
        const { name } = req.body;
        const slug = name.toLowerCase().split(' ').join('-');
        const payload = {
            name,
            slug,
        };
        await (0, category_service_1.createCategoryDB)(payload);
        return response_1.response.success(res, 'success create category', 200);
    }
    catch (error) {
        if (error.errors) {
            return response_1.response.requestError(res, error.errors[0]);
        }
        return response_1.response.serverError(res, error.message);
    }
};
exports.createCategory = createCategory;
const getCategories = async (req, res) => {
    try {
        const result = await (0, category_service_1.getCategoriesDB)();
        //    return response.pagination(res, "success get categories", result, {MaxPerPage: })
    }
    catch (error) {
        return;
    }
};
exports.getCategories = getCategories;
