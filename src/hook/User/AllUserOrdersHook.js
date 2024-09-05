import React from 'react'
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllUserOrders } from '../../Redux/actions/orderActions';

const AllUserOrdersHook = () => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [result, setResult] = useState('');
    const [paginate, setPaginate] = useState('');



    const dispatch = useDispatch();
    const allOrs = useSelector((state) => state.orderReducer.allUserOrders);
    const navigate = useNavigate();
    useEffect(()=>{

get()

    },[])

    const get=async()=>{
        setLoading(true)
        await dispatch(getAllUserOrders('',5))
        setData(allOrs.data)
        setPaginate(allOrs.paginationResult)
        setResult(allOrs.results)
        setLoading(false)
    }


    const onPress=async(page)=>{
        setLoading(true)
        await dispatch(getAllUserOrders(page,5))
        setData(allOrs.data)
        setPaginate(allOrs.paginationResult)
        setResult(allOrs.results)
        setLoading(false)
    }

    console.log("allOrders>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",allOrs)

  return [data,result,paginate,onPress] 
   
  
}

export default AllUserOrdersHook
