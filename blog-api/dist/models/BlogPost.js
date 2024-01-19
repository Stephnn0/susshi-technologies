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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
var BlogPostCategory;
(function (BlogPostCategory) {
    BlogPostCategory["PROGRAMMING"] = "programming";
    BlogPostCategory["CYBERSECURITY"] = "cyber-security";
    BlogPostCategory["BLOCKCHAIN"] = "blockchain";
    BlogPostCategory["MACHINELEARNING"] = "machine-learning";
    BlogPostCategory["NETWORKS"] = "networks";
    BlogPostCategory["CLOUDCOMPUTING"] = "cloud-computing";
    BlogPostCategory["BIOLOGY"] = "biology";
    BlogPostCategory["CHEMESTRY"] = "chemestry";
    BlogPostCategory["MATH"] = "math";
    BlogPostCategory["PHYSICS"] = "physics";
    BlogPostCategory["LIFESCIENCE"] = "life-science";
    BlogPostCategory["THEOLOGY"] = "theology";
})(BlogPostCategory || (BlogPostCategory = {}));
var BlogStatus;
(function (BlogStatus) {
    BlogStatus["published"] = "published";
    BlogStatus["draft"] = "draft";
    BlogStatus["archived"] = "archived";
})(BlogStatus || (BlogStatus = {}));
const ParagraphsSchema = new mongoose_1.Schema({
    topic: { type: String, default: '' },
    description: { type: String, required: true },
    hasImage: { type: Boolean, default: false },
    url: { type: String, default: '' },
});
const CommentsSchema = new mongoose_1.Schema({
    user: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
});
const BlogPostSchema = new mongoose_1.Schema({
    blogId: { type: String, required: true },
    mainTitle: { type: String, required: true },
    introDescription: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, default: Date.now },
    awsUrl: { type: String, default: '' },
    category: {
        type: String,
        enum: Object.values(BlogPostCategory),
        required: true,
    },
    readTime: { type: String, required: true },
    views: { type: Number, default: 0 },
    status: {
        type: String,
        enum: Object.values(BlogStatus),
        required: true,
    },
    paragraphs: [ParagraphsSchema],
    comments: [CommentsSchema],
    commentsCount: { type: Number, default: 0 }
});
exports.default = mongoose_1.default.model("BlogPost", BlogPostSchema);
//# sourceMappingURL=BlogPost.js.map