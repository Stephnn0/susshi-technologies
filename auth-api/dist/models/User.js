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
exports.User = exports.userSchema = exports.OrderSchema = exports.OrderItem = exports.ServiceSchema = exports.AddressSchema = exports.BenefitSchema = exports.useCasesSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var UserRole;
(function (UserRole) {
    UserRole["User"] = "2001";
    UserRole["Editor"] = "";
    UserRole["Admin"] = "";
})(UserRole || (UserRole = {}));
var ServiceCategory;
(function (ServiceCategory) {
    ServiceCategory["AUTOMATION"] = "automation";
    ServiceCategory["INDUSTRY"] = "industry";
    ServiceCategory["SECURITY"] = "security";
    ServiceCategory["AI"] = "ai";
    ServiceCategory["ANALYTICS"] = "analytics";
    ServiceCategory["SUSTAINABILITY"] = "sustainability";
    ServiceCategory["INFRASTRUCTURE"] = "infrastructure";
    ServiceCategory["DATABASES"] = "databases";
    ServiceCategory["SERVERS"] = "servers";
    ServiceCategory["DEVOPS"] = "devops";
    ServiceCategory["QUANTUM"] = "quantum";
    ServiceCategory["BLOCKCHAIN"] = "blockchain";
})(ServiceCategory || (ServiceCategory = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Processing"] = "Processing";
    OrderStatus["Shipped"] = "Shipped";
    OrderStatus["Delivered"] = "Delivered";
    OrderStatus["Completed"] = "Completed";
    OrderStatus["Canceled"] = "Canceled";
})(OrderStatus || (OrderStatus = {}));
exports.useCasesSchema = new mongoose_1.Schema({
    topic: { type: String, required: true },
    description: { type: String, required: true },
});
exports.BenefitSchema = new mongoose_1.Schema({
    topic: { type: String, required: true },
    description: { type: String, required: true },
});
exports.AddressSchema = new mongoose_1.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
});
exports.ServiceSchema = new mongoose_1.Schema({
    serviceId: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
        type: String,
        enum: Object.values(ServiceCategory),
        required: true,
    },
    topic: { type: String, required: true },
    description: { type: String, required: true },
    overviewtopic: { type: String, required: true },
    overviewDescription: { type: String, required: true },
    benefits: [exports.BenefitSchema],
    useCases: [exports.useCasesSchema],
    solutionsDesc: { type: String, required: true },
    productDesc: { type: String, required: true },
    imgUrl: { type: String, default: '' },
    awsUrl: { type: String, default: '' },
});
exports.OrderItem = new mongoose_1.Schema({
    orderItemId: { type: String, required: true },
    service: { type: exports.ServiceSchema, required: true },
    quantity: { type: Number, required: true },
    subtotal: { type: Number, required: true }
});
exports.OrderSchema = new mongoose_1.Schema({
    orderId: { type: String, required: true },
    orderNumber: { type: String, required: true },
    items: [exports.OrderItem],
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    status: { type: String, enum: OrderStatus, required: true }
});
exports.userSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: [String],
    profilePicAWSURL: { type: String, default: '' },
    profilePicLink: { type: String, default: '' },
    phoneNumber: {
        type: String,
        default: '',
    },
    orders: [exports.ServiceSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    roles: {
        User: {
            type: String,
            default: UserRole.User,
        },
        Editor: {
            type: String,
            default: UserRole.Editor,
        },
        Admin: {
            type: String,
            default: UserRole.Admin,
        },
    },
});
exports.User = mongoose_1.default.model("User", exports.userSchema);
exports.default = exports.User;
//# sourceMappingURL=User.js.map