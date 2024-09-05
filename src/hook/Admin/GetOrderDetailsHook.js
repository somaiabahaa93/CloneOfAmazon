import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOneOrder } from "../../Redux/actions/orderActions";
const GetOrderDetailsHook = (id) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const allOrs = useSelector((state) => state.orderReducer.oneOrder);
  const navigate = useNavigate();
  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    setLoading(true);
    await dispatch(getOneOrder(id));
    setLoading(false);
  };

  useEffect(()=>{
    if(loading===false)
        setData(allOrs.data)
  },[loading])

  console.log("data11111111111111111111", data);
  return [data];
};

export default GetOrderDetailsHook;
