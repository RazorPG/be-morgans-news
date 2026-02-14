"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = connection;
const mongoose_1 = __importDefault(require("mongoose"));
const environments_1 = require("./environments");
let connected = false;
async function connection() {
    if (connected)
        return;
    try {
        await mongoose_1.default.connect(environments_1.MONGO_URL, {
            dbName: 'news_db',
        });
        console.log('success connected db');
        connected = true;
    }
    catch (error) {
        console.log('error: ' + error);
    }
}
