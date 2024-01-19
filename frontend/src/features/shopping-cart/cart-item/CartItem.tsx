import { useEffect, useState } from "react"
import { useShoppingCart } from "../../../context/ShoppingCartContext"
import axios from "axios";
import {  formatPriceInDollarsAndCents } from "../../../utilities/formatCurrency";
import "./card-item.css"
import { Service, CartItemProps } from "../../../types/types";
import APIEndpoints from "../../../utilities/urls";


 const defaultPosts:Service[] = [];


const CartItem = ({ id, quantity }: CartItemProps ) => {
    const { removeFromCart } = useShoppingCart()
    const [services, setServices]: [Service[], (posts: Service[]) => void] = useState(defaultPosts)

    const item = services.find(i => i.serviceId === id)
    // console.log(item, "item")

     
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
    // testing
    // console.log('services', services)

    if (item == null) return null


  return (
    <div className="single-item-shopping-cart">
      <div className="single-item-shopping-cart-img">
        <img src={item.imgUrl}  style={{width: "200px"}}/>
      </div>
      <div className="single-item-shopping-cart-info">
        <h2>{item.topic}</h2>
        <div className="single-item-shopping-cart-price">
         <h5>Qty: {quantity}</h5> 
         <h3>{formatPriceInDollarsAndCents(item.price * quantity)}</h3> 
        </div>
        {/* <button onClick={() => increaseCartQuantity(item.serviceId)}>+</button> */}
        {/* <button onClick={() => decreaseCartQuantity(item.serviceId)}>-</button> */}
        <h4 onClick={() => removeFromCart(item.serviceId)}>remove from cart</h4>
      </div>
 
    </div>
  )
}

export default CartItem