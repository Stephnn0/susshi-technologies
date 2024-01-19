import express from "express";
import { getOrdersByCustomer } from "./../controllers/orderController"

const router = express.Router();


router.get("/", getOrdersByCustomer);

export default router;

