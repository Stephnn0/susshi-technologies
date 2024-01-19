import mongoose from "mongoose";
import Service from "../models/Service";
import { CustomOrderItem, OrderInterface, OrderStatus } from "../types/types";
import { OrderModel, OrderItemModel } from "../models/Order";
import { Request, Response } from "express";



export const createOrder = async (customerId: any, metadata: any) => {

    try {
        const cusId = customerId
        const servicesIds = metadata
        const parse = JSON.parse(servicesIds['cart']); 
    
        const orderItems: CustomOrderItem[] = [];
        for (const serviceId of parse) {
    
            const service = await Service.findOne({serviceId: serviceId}).exec();

            if (service) {
              const subtotal = service.price; // You can adjust this calculation as needed
              const orderItem: CustomOrderItem = {
                orderItemId: new mongoose.Types.ObjectId().toString(), 
                service: service.serviceId, // Assign the Service ID
                quantity: 1, // Assuming each service is one unit
                subtotal,
              };
              orderItems.push(orderItem);
            }
          }
          const totalAmount = orderItems.reduce((total, item) => total + item.subtotal, 0);

          // get last order number 
          const order: OrderInterface = {
            orderId: new mongoose.Types.ObjectId().toString(), // Generate a unique ID for the Order
            customerId,
            orderNumber: 'ORD0001', // Implement your own order number generation logic
            items: orderItems,
            totalAmount,
            orderDate: new Date(),
            status: OrderStatus.Processing, // Set the initial status
          };

          const createdOrder = await OrderModel.create(order);
          const createdOrderItems = await OrderItemModel.insertMany(orderItems);
          createdOrder.items = createdOrderItems;
    
          return createdOrder;

    } catch (err) {
        console.log(err)
    }
   
  };


  export const getOrdersByCustomer =  async (req: Request, res: Response) => {
    try {
        const { customerEmail } = req.query; 

        const orders = await OrderModel.find()
        .where({ customerId: customerEmail })
        .sort({ date: -1 }).exec();
        res.status(200).json(orders);

    } catch(err){
      console.log(err.message)
        res.status(500).json({ error: 'Failed to fetch orders' });
    }

  }
  
  
  
  
  
  
  