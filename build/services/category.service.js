"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryBySlug = exports.getCategoriesDB = exports.createCategoryDB = void 0;
const category_model_1 = __importDefault(require("../models/category.model"));
const createCategoryDB = async (payload) => {
    return await category_model_1.default.create(payload);
};
exports.createCategoryDB = createCategoryDB;
const getCategoriesDB = async () => {
    return await category_model_1.default.find();
};
exports.getCategoriesDB = getCategoriesDB;
const getCategoryBySlug = async (slug) => {
    return await category_model_1.default.findOne({ slug });
};
exports.getCategoryBySlug = getCategoryBySlug;
