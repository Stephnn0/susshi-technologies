import { useContext, useEffect, useState } from "react";
import "./order-page.css"
import { AuthContext, TodoContextType } from "../../../context/AuthProvider";
import axios from "axios";
import jwt_decode from "jwt-decode";
import ReceiptIcon from '@mui/icons-material/Receipt';
import Footer from "../../../components/Footer/Footer";
import { format } from 'date-fns';
import CategoryIcon from '@mui/icons-material/Category';
import APIEndpoints from "../../../utilities/urls";
import { OrderInterface } from "../../../types/types";

type JwtPayload = {
  UserInfo: {
    userId: Array<string>[],
    email: string
  }
}


const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const { accessToken } = useContext(AuthContext) as TodoContextType
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state


  const getEmailFromToken = (): string | null => {
    if (accessToken && accessToken.accessToken) {
      try {
        const decodedToken = jwt_decode<JwtPayload>(accessToken.accessToken as string);
        const email = decodedToken.UserInfo.email
        return email
      } catch (error) {
        console.error('JWT decoding error:', error);
      }
    }
    return null;
  };

  const email = getEmailFromToken()
  
  
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${APIEndpoints.orders}`,
        
        {
          params: {
            customerEmail: email
          }
        });
        setOrders(response.data);
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false)
      }
    };

    fetchOrders();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [email]);

   

  return (
    <>
    {isLoading ? (
 <section className="order-screen-main-sec">

      <h1>loading</h1>
      </section>
    ) : orders.length === 0 ? (
      <section className="order-screen-main-sec-empty">
      <h1>No orders found</h1>
      <CategoryIcon
                 style={{
                  height: "100px",
                  width: "300px"
                 }}/>
      </section>

    ) : (
      <div style={{paddingTop: "50px"}}>
        <h2 style={{padding: "20px"}}>Your Orders:</h2>
        <hr/>
      <section className="order-screen-main-sec">
      {orders.map((order: OrderInterface) => (

      <div className="order-cart-container-main">
        <div className="order-cart-container-top">
            <div className="date-amount-container">
              <div style={{display: "flex", flexDirection: "column", paddingRight: "20px"}}>
              <h4>Order placed</h4>
              <h4>
              { format(new Date(order.orderDate), 'dd MMM yyyy')}
              </h4>
              </div>
              <div style={{display: "flex", flexDirection: "column"}}>
              <h4>Total</h4>
              <h4>${order.totalAmount * 100}</h4>
              </div>
            </div>
            <div className="order-invoice-container">
              <h4>Order number #{order.orderNumber}</h4>
              <div className="order-invoice-container-inside">
              <h4>View order details</h4>
              <h4>View invoice</h4>
              </div>
 
            </div>   
        </div>

        <div className="order-cart-container-down">
          <div>
            <h2>#{order.orderNumber}</h2>
            <h4>status: {order.status}</h4>
            <div className="order-image-container-main">
               <ReceiptIcon color="primary" style={{
                height: "80px",
                width: "80px"
               }}/>

              <div className="buttons-actions-container">
                {/* <h5>service description</h5> */}
                <h5>Buy it again</h5>
                <h5>View your item</h5>
              </div>
            </div>
          </div>

          <div className="extra-options-container">
            <h4>Get help</h4>
            <h4>Leave a feedback</h4>
            <h4>Write a product review</h4>
          </div>
        </div>
      </div>
  ))}      
    </section>
    </div>
)}
    <Footer/>
    </>
  )
}

export default OrderPage




