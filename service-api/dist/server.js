"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
require('dotenv').config({ path: "../.env" });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const serviceRoutes_1 = __importDefault(require("./routes/serviceRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connectDB = require('./config/dbConn');
const s3_1 = require("./s3");
const stripe_1 = require("./stripe");
const body_parser_1 = __importDefault(require("body-parser"));
const orderController_1 = require("./controllers/orderController");
const stripe_2 = require("./stripe");
const port = process.env.PORT || 3002;
connectDB();
const app = (0, express_1.default)();
var corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/api/services", serviceRoutes_1.default);
app.use("/api/orders", orderRoutes_1.default);
app.get('/api/service-s3Url', async (req, res) => {
    try {
        const url = await (0, s3_1.generateUploadURL)();
        res.send({ url });
    }
    catch (err) {
        console.log(err);
    }
});
const signedKey = process.env.STRIPE_WEBHOOK_KEY_PRODUCTION;
app.post('/api/webhook', body_parser_1.default.raw({ type: "application/json" }), async (req, res) => {
    const payload = req.body;
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe_2.stripe.webhooks.constructEvent(payload, sig, signedKey);
    }
    catch (err) {
        console.log(err);
    }
    switch (payload.type) {
        case 'checkout.session.completed':
            console.log('email', payload.data.object.customer_email);
            console.log('metadata', payload.data.object.metadata);
            const email = payload.data.object.customer_email;
            const metadata = payload.data.object.metadata;
            const response = await (0, orderController_1.createOrder)(email, metadata);
            console.log('response', response);
            break;
        case 'payment_intent.created':
            console.log('payment_intent.created');
            break;
        default:
            console.log(`Unhandled event type`);
    }
    res.send().end();
    console.log('success');
});
app.post('/api/create-checkout-session', stripe_1.createCheckOutSession);
mongoose_1.default.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
//# sourceMappingURL=server.js.map