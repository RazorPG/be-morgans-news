"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContentHtmlSendMail = createContentHtmlSendMail;
exports.sendMail = sendMail;
const ejs_1 = __importDefault(require("ejs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const environments_1 = require("../environments");
const transporter = nodemailer_1.default.createTransport({
    port: environments_1.EMAIL_SMTP_PORT,
    host: environments_1.EMAIL_SMTP_HOST,
    auth: {
        user: environments_1.EMAIL_SMTP_USER,
        pass: environments_1.EMAIL_SMTP_PASS,
    },
});
function createContentHtmlSendMail(sourceContent, data) {
    console.log(path_1.default.join(__dirname, `templates/${sourceContent}`));
    let htmlContent;
    ejs_1.default.renderFile(path_1.default.join(__dirname, `templates/${sourceContent}`), data, (err, template) => {
        if (err) {
            throw err;
        }
        else {
            htmlContent = template;
        }
    });
    return htmlContent;
}
function sendMail(subject, html, data) {
    console.log(subject, data, html);
    transporter.sendMail({
        from: environments_1.EMAIL_SMTP_USER,
        to: data.email,
        subject,
        html,
    }, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email send: ' + info.response);
        }
    });
}
