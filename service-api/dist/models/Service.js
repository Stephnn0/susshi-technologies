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
const types_1 = require("../types/types");
const BenefitSchema = new mongoose_1.Schema({
    topic: { type: String, required: true },
    description: { type: String, required: true },
});
const useCasesSchema = new mongoose_1.Schema({
    topic: { type: String, required: true },
    description: { type: String, required: true },
});
const ServiceSchema = new mongoose_1.Schema({
    serviceId: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
        type: String,
        enum: Object.values(types_1.ServiceCategory),
        required: true,
    },
    topic: { type: String, required: true },
    description: { type: String, required: true },
    overviewtopic: { type: String, required: true },
    overviewDescription: { type: String, required: true },
    benefits: [BenefitSchema],
    useCases: [useCasesSchema],
    title2: { type: String, required: true },
    overview2: { type: String, required: true },
    title3: { type: String, required: true },
    overview3: { type: String, required: true },
    imgUrl: { type: String, default: '' },
    awsUrl: { type: String, default: '' },
});
const ServiceModel = mongoose_1.default.model('Service', ServiceSchema);
exports.default = ServiceModel;
//# sourceMappingURL=Service.js.map