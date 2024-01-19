"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckOutSession = exports.stripe = void 0;
const stripe_1 = __importDefault(require("stripe"));
const Service_1 = __importDefault(require("./models/Service"));
exports.stripe = new stripe_1.default(process.env.STRIPE_PRIVATE_KEY, {
    apiVersion: '2023-08-16',
});
const createCheckOutSession = async (req, res) => {
    try {
        const { cartItems, customerId, email, cart } = req.body;
        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({ error: 'Invalid or empty products array' });
        }
        let stripeCustomerId = customerId;
        try {
            await exports.stripe.customers.list({
                email: email,
            });
        }
        catch (error) {
            if (error.statusCode === 404) {
                const customer = await exports.stripe.customers.create({
                    email: email,
                    metadata: {
                        userId: customerId,
                        cart: JSON.stringify(cartItems),
                    },
                });
                stripeCustomerId = customer.id;
            }
            else {
                throw error;
            }
        }
        const productDetails = await Promise.all(cartItems.map(async (id) => {
            const service = await Service_1.default.findOne({ serviceId: id }).exec();
            if (!service) {
                throw new Error(`Product not found for ID: ${id}`);
            }
            return {
                name: service.topic,
                description: service.description,
                price: service.price,
                id,
            };
        }));
        const lineItems = productDetails.map((product) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: product.name,
                    description: product.description,
                },
                unit_amount: product.price,
            },
            quantity: 1,
        }));
        const session = await exports.stripe.checkout.sessions.create({
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
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
};
exports.createCheckOutSession = createCheckOutSession;
//# sourceMappingURL=stripe.js.map