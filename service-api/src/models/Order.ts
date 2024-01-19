import mongoose, { Schema, Document } from 'mongoose';
import { OrderInterface, CustomOrderItem, OrderStatus } from '../types/types';


const orderItemSchema = new Schema<CustomOrderItem>({
    orderItemId: { type: String, required: true },
    service: { type: String, required: true },
    quantity: { type: Number, required: true },
    subtotal: { type: Number, required: true },
  });

  const orderSchema = new Schema<OrderInterface>({
    orderId: { type: String, required: true },
    customerId: { type: String, required: true },
    orderNumber: { type: String, required: true },
    items: [orderItemSchema], // Embed OrderItem documents as an array
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, required: true },
    status: { type: String, enum: OrderStatus, required: true }, // Adjust the enum values as needed
  });

  export const OrderModel = mongoose.model<OrderInterface>('Order', orderSchema);
  export const OrderItemModel = mongoose.model<CustomOrderItem>('OrderItem', orderItemSchema);