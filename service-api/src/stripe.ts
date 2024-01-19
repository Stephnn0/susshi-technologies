import Stripe from "stripe";
import Service from "./models/Service"
import { Request, Response } from "express";


export const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
    apiVersion: '2023-08-16',
  });



export const createCheckOutSession = async (req: Request, res: Response) => {
    try {

        const { cartItems, customerId, email, cart} = req.body;

        if (!Array.isArray(cartItems) || cartItems.length === 0) {
          return res.status(400).json({ error: 'Invalid or empty products array' });
        }

        // create customer 
        let stripeCustomerId = customerId;
        try {
          await stripe.customers.list({
            email: email,
          });
        } catch (error) {
          if (error.statusCode === 404) {
            const customer = await stripe.customers.create({
                email: email,
                metadata: {
                userId: customerId,
                cart: JSON.stringify(cartItems),
              },
            });
            stripeCustomerId = customer.id;
          } else {
            throw error;
          }
        }


        // find products 
        const productDetails = await Promise.all(
          cartItems.map(async (id: string) => {
            const service = await Service.findOne({ serviceId: id }).exec();
            if (!service) {
              throw new Error(`Product not found for ID: ${id}`);
            }
            return {
              name: service.topic,
              description: service.description,
              price: service.price,
              id, // Include the product ID for reference
            };
          })
        );

        const lineItems = productDetails.map((product) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.price, 
            // unit_amount: product.price * 100, 

          },
          quantity: 1,
        }));

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'payment',
          metadata: {
            cart: JSON.stringify(cartItems)
          },
          customer_email: email,
          line_items: lineItems,
          success_url: process.env.SUCCESS_URL_PRODUCTION, 
          cancel_url: process.env.CANCEL_URL_PRODUCTION,
        });
    
        res.json({ sessionId: session.url });
      
    } catch(error){
      res.status(500).json({ error: 'Failed to create checkout session' });
    }
 }


//ONE PRODUCT
//  export const createCheckOutSession = async (req: Request, res: Response) => {
//   try {

//       const { serviceId } = req.body;

//       const service = await Service.findOne({ serviceId: serviceId as string }).exec();

//       if (!service) {
//           return res.status(404).json({ error: 'Product not found' });
//         }

//       const session = await stripe.checkout.sessions.create({
//           payment_method_types: ['card'],
//           mode: 'payment',
//           line_items: [
//               {
//                 price_data: {
//                   currency: 'usd',
//                   product_data: {
//                     name: service.topic, 
//                     description: service.description, 
//                   },
//                   unit_amount: service.price, 
//                 },
//                 quantity: 1,
//               },
//             ],
//           success_url: 'successurl/', //env
//           cancel_url: 'cancelurl/shoppingpage'
//       });

//       res.json({ sessionId: session.id });

//   } catch(error){
//        res.status(500).json({ error: 'Failed to create checkout session' });
//   }
// }
