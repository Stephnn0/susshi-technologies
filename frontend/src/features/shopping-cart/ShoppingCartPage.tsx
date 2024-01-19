import Footer from "../../components/Footer/Footer"
import { useShoppingCart } from "../../context/ShoppingCartContext"
import CartItem from "./cart-item/CartItem"
import {  formatPriceInDollarsAndCents } from "../../utilities/formatCurrency"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Service }  from "../../types/types"
import "./shopping-cart-page.css"
import CircularProgress from '@mui/material/CircularProgress';
import { AuthContext, TodoContextType } from "../../context/AuthProvider"
import jwt_decode from "jwt-decode";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { JwtPayload } from "../../types/types"
import APIEndpoints from "../../utilities/urls"
import { Link } from "react-router-dom"


const defaultPosts:Service[] = [];


const ShoppingCartPage = () => {
  const {  cartItems, cartQuantity } = useShoppingCart()
  const [services, setServices]: [Service[], (posts: Service[]) => void] = useState(defaultPosts)
  const [isSending, setIsSending] = useState<boolean>(false); 
  const { accessToken } = useContext(AuthContext) as TodoContextType


  const getIdFromToken = (): string | null => {
    if (accessToken && accessToken.accessToken) {
      try {
        const decodedToken = jwt_decode<JwtPayload>(accessToken.accessToken as string);
        const backTogether = decodedToken.UserInfo.userId.join('')
        return backTogether
      } catch (error) {
        console.error('JWT decoding error:', error);
      }
    }
    return null;
  };



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
  const id = getIdFromToken();




  const initiateCheckout = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsSending(true)
    try {
  
      const response = await axios.post(`${APIEndpoints.stripe}/api/create-checkout-session`, {
        cartItems: cartItems.map((item) => item.id), 
        customerId: id,
        email: email,
        cart: cartItems
      });
      
      window.location.href = response.data.sessionId;
      setIsSending(false);
    } catch (error) {
      console.error('Error initiating checkout:', error);
    } finally {
      setIsSending(false);
    }
  };

 


  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await axios.get(`${APIEndpoints.services}`,
            { headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
              },
            })
            setServices(res.data)
        } catch (err){
            console.log(err)
        } 
    };
    fetchData();
    window.scrollTo({ top: 0, behavior: 'smooth' });

},[]);

  return (
    <> {
      cartQuantity !== 0  ? (
    <section className="shooping-cart-section">
      <div className="shopping-card-items-block">
      {
        cartItems.map(item => (
          <CartItem key={item.id} {...item}/>
         
        ))}
      </div>

      {
        !accessToken?.accessToken  ? 
       
        <div className="order-summary-section">
        <h5>Please Login to continue with your purchase</h5>
        <br/>
        <Link to='/login'><button>Login here</button></Link>
       </div> :

      <div className="order-summary-section">
       <h3>Order Summary</h3>
        <div className="order-summary-section-subtotal-div">
        <h4>Subtotal</h4>
        <h4>
        {" "}
        {formatPriceInDollarsAndCents(
          cartItems.reduce((total, cartItem) => {
            const item = services.find(i => i.serviceId === cartItem.id)
            console.log('ids', item?.serviceId)
            return total + (item?.price || 0) * cartItem.quantity
          }, 0)
        )}
        </h4>
        </div>
       { isSending ? (
        <div style={{display: "flex", justifyContent: "center"}}><CircularProgress />
        </div>
            ) : (
        <button
          onClick={initiateCheckout}>checkout
        </button> )
         }
      </div> 
      }

    </section> 
    ) : 
     (
      <div className="empty-cart-main">
        <div className="empty-cart-main-inside">
           <h1>Your car is empty</h1>

           <ShoppingCartIcon 
           style={{
            height: "100px",
            width: "300px"
           }}
           className="icon-shooping"/>
           <span>Continue shopping</span>
        </div>
      </div>
     )
    }
    <Footer/>
    </>
  )
}

export default ShoppingCartPage