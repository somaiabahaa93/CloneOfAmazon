import React, { useEffect, useState } from "react";
import { createCashOrder } from "../../Redux/actions/checkoutActions";
import { getOneAddress } from "../../Redux/actions/addressActions";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GetAllUserCartHook from "../cart/GetAllUserCartHook";
import notify from "../notificationHook";

const OrderPayCashHook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [creatLoading, setCreatLoading] = useState(true);

  const [addressDetails, setAddressDetails] = useState([]);
  const [
    itemsNum,
    cartItems,
    totalCartPrice,
    couponNameRes,
    totalCartPriceAfterDiscount,
    cartId,
  ] = GetAllUserCartHook();
  const dispatch = useDispatch();
  const res = useSelector((state) => state.addressReducer.oneAddress);
  const cashOrderRes = useSelector((state) => state.checkoutReducer.cashOrder);

  console.log("cartIIIIID", cartId);
  const get = async (id) => {
    setLoading(true);
    await dispatch(getOneAddress(id));
    setLoading(false);
  };
  //   to get user shipping address
  const handleChooseAddress = (e) => {
    setAddressDetails([]);
    if (e.target.value !== 0) {
      get(e.target.value);
    }
  };

  useEffect(() => {
    if (loading === false) {
      if (res.data) {
        setAddressDetails(res.data);
      } else {
        setAddressDetails([]);
      }
    }
  }, [loading]);

  //   when user make order cash
  const handleCreateOrderCash = async () => {
    if (cartId === "0") {
      notify("can't make order as no cart", "warn");
      return;
    }

    setCreatLoading(true);
    await dispatch(
      createCashOrder(cartId, {
        shippingAddress: {
          details: addressDetails.alias,
          phone: addressDetails.phone,
          city: "",
          postalCode: "",
        },
      })
    );
    setCreatLoading(false);
  };

  useEffect(() => {
    if (creatLoading === false) {
      console.log("resOOOOOOOOO", cashOrderRes);
      if (cashOrderRes && cashOrderRes.data.message === "success") {
        notify("order created successfully", "success");
        setTimeout(() => {
          navigate("/user/allorders");
        }, 1000);
      } else {
        notify("there is an error", "error");
      }

      console.log(res);

      if (res.status === 400) {
        console.log(res?.data.errors[0].msg);

        notify(res.data.errors[0].msg, "error");
      }

      if (res.status === 403) {
        console.log(res.data.message);

        notify(res.data.message, "error");
      }
    }
  }, [creatLoading]);

  return [handleChooseAddress, addressDetails, handleCreateOrderCash];
};

export default OrderPayCashHook;
