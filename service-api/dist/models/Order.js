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
exports.OrderItemModel = exports.OrderModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const types_1 = require("../types/types");
const orderItemSchema = new mongoose_1.Schema({
    orderItemId: { type: String, required: true },
    service: { type: String, required: true },
    quantity: { type: Number, required: true },
    subtotal: { type: Number, required: true },
});
const orderSchema = new mongoose_1.Schema({
    orderId: { type: String, required: true },
    customerId: { type: String, required: true },
    orderNumber: { type: String, required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, required: true },
    status: { type: String, enum: types_1.OrderStatus, required: true },
});
exports.OrderModel = mongoose_1.default.model('Order', orderSchema);
exports.OrderItemModel = mongoose_1.default.model('OrderItem', orderItemSchema);
//# sourceMappingURL=Order.js.map