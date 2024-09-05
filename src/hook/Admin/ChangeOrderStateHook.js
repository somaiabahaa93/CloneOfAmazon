import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getOneOrder,
  updateOrderStateDeliverd,
  updateOrderStatePaid,
} from "../../Redux/actions/orderActions";
import notify from "../notificationHook";
const ChangeOrderStateHook = (id) => {
  const [loading, setLoading] = useState(true);
  const [loadingDel, setLoadingDel] = useState(true);

  const [orPaid, setOrPaid] = useState([]);
  const [orDel, setOrDel] = useState([]);

  const dispatch = useDispatch();
  const orderDel = useSelector((state) => state.orderReducer.orderDeliverd);
  const orderPaid = useSelector((state) => state.orderReducer.orderPaid);

  const navigate = useNavigate();

 

  const onChangeDeliver = (e) => {
    setOrDel(e.target.value);
  };

  const handleOnChangeDeliverd = async () => {
    setLoadingDel(true);
    if (orderDel === "true") await dispatch(updateOrderStateDeliverd(id));
    setLoadingDel(false);
  };

  useEffect(() => {
    if (loadingDel === false) console.log("upDel>>>>>>>>>>>", orderDel);
    if (orderDel.status === 200) {
      notify("order sate updated successfully", "success");
      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    }
   
  }, [loadingDel]);


  const onChangePaid = (e) => {
    setOrPaid(e.target.value);
  };

  const handleOnChangePaid = async () => {
    setLoading(true);
    if (orPaid === "true") await dispatch(updateOrderStatePaid(id));
    setLoading(false);
  };

  useEffect(() => {
    if (loading === false) console.log("up>>>>>>>>>>>", orderPaid);
    if (orderPaid.status === 200) {
      notify("order sate updated successfully", "success");
      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    }
   
  }, [loading]);

 

  return [
    onChangePaid,
    handleOnChangePaid,
    onChangeDeliver,
    handleOnChangeDeliverd,
  ];
};

export default ChangeOrderStateHook;
