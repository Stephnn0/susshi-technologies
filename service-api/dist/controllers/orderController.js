"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersByCustomer = exports.createOrder = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Service_1 = __importDefault(require("../models/Service"));
const types_1 = require("../types/types");
const Order_1 = require("../models/Order");
const createOrder = async (customerId, metadata) => {
    try {
        const cusId = customerId;
        const servicesIds = metadata;
        const parse = JSON.parse(servicesIds['cart']);
        const orderItems = [];
        for (const serviceId of parse) {
            const service = await Service_1.default.findOne({ serviceId: serviceId }).exec();
            if (service) {
                const subtotal = service.price;
                const orderItem = {
                    orderItemId: new mongoose_1.default.Types.ObjectId().toString(),
                    service: service.serviceId,
                    quantity: 1,
                    subtotal,
                };
                orderItems.push(orderItem);
            }
        }
        const totalAmount = orderItems.reduce((total, item) => total + item.subtotal, 0);
        const order = {
            orderId: new mongoose_1.default.Types.ObjectId().toString(),
            customerId,
            orderNumber: 'ORD0001',
            items: orderItems,
            totalAmount,
            orderDate: new Date(),
            status: types_1.OrderStatus.Processing,
        };
        const createdOrder = await Order_1.OrderModel.create(order);
        const createdOrderItems = await Order_1.OrderItemModel.insertMany(orderItems);
        createdOrder.items = createdOrderItems;
        return createdOrder;
    }
    catch (err) {
        console.log(err);
    }
};
exports.createOrder = createOrder;
const getOrdersByCustomer = async (req, res) => {
    try {
        const { customerEmail } = req.query;
        const orders = await Order_1.OrderModel.find()
            .where({ customerId: customerEmail })
            .sort({ date: -1 }).exec();
        res.status(200).json(orders);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};
exports.getOrdersByCustomer = getOrdersByCustomer;
//# sourceMappingURL=orderController.js.map