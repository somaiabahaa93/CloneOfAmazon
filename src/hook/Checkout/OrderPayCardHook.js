import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GetAllUserCartHook from "../cart/GetAllUserCartHook";
import { useDispatch, useSelector } from "react-redux";
import notify from "../notificationHook";
import { createCardOrder } from "../../Redux/actions/checkoutActions";


const OrderPayCardHook = (addressDetails) => {
    const [
        itemsNum,
        cartItems,
        totalCartPrice,
        couponNameRes,
        totalCartPriceAfterDiscount,
        cartId,
      ] = GetAllUserCartHook();
      const dispatch = useDispatch();
      const cardOrderRes = useSelector((state) => state.checkoutReducer.cardOrder);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const handleCreateOrderCard = async () => {
        if (cartId === "0") {
          notify("can't make order as no cart", "warn");
          return;
        }
    
        setLoading(true);
        await dispatch(
            createCardOrder(cartId, {
            shippingAddress: {
              details: addressDetails.alias,
              phone: addressDetails.phone,
              city: "",
              postalCode: "",
            },
          })
        );
        setLoading(false);
      };




      useEffect(() => {
        if (loading === false) {
          console.log("resOOOOOOOOO", cardOrderRes);
          if (cardOrderRes && cardOrderRes.status === "success") {
            // notify("order created successfully", "success");
            window.open(cardOrderRes.data.url)
           
          } else {
            notify("there is an error", "error");
          }
    
         
        }
      }, [loading]);
  return [handleCreateOrderCard]
      
   
}

export default OrderPayCardHook
