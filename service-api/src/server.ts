const path = require('path');
require('dotenv').config({ path: "../.env" });

import express from "express";
import mongoose from "mongoose";
import serviceRoutes from "./routes/serviceRoutes";
import orderRoutes from "./routes/orderRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";

const connectDB = require('./config/dbConn');

import { generateUploadURL } from './s3'
import { createCheckOutSession } from './stripe'
import bodyParser from "body-parser";
import { createOrder } from "./controllers/orderController";
import { stripe } from "./stripe";


const port = process.env.PORT || 3002;

connectDB();


const app = express();

//PRODUCTION
// var corsOptions = {
//   origin: ["https://susshitechnologies.com","https://bahiascience.com"],
//   credentials: true
// };

//TESTING
var corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
  };

  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(express.json());
  
  
  app.use("/api/services", serviceRoutes);
  app.use("/api/orders", orderRoutes);


  app.get('/api/service-s3Url', async (req, res) => {
    try {
      const url = await generateUploadURL()
      res.send({ url });
  
    } catch (err) {
      console.log(err)
    }
  });



// STRIPE WEBHOOK
const signedKey: string = process.env.STRIPE_WEBHOOK_KEY_PRODUCTION
app.post('/api/webhook', bodyParser.raw({type: "application/json"}), async (req, res) => {

  const payload = req.body
  const sig = req.headers['stripe-signature']
  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, signedKey)
  } catch (err) {
    console.log(err)
  }

  switch (payload.type) {
    case 'checkout.session.completed':
      console.log('email', payload.data.object.customer_email)
      console.log('metadata', payload.data.object.metadata)
      const email = payload.data.object.customer_email
      const metadata = payload.data.object.metadata
      const response = await createOrder(email, metadata)
      console.log('response', response)
      break;
    case 'payment_intent.created':
        console.log('payment_intent.created')
        break;
    default:
      console.log(`Unhandled event type`);
  }
  res.send().end()
  console.log('success')
});
// END WEBHOOK




  app.post('/api/create-checkout-session', createCheckOutSession);



// DATABASE
  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    });