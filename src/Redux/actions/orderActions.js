import { useGetDataToken } from "../../Hooks/useGetData";
import { useUpdateData } from "../../Hooks/useUpdateData";
import { GET_ALL_USER_ORDERS, GET_ERROR, GET_ONE_ORDER, TYPE_ORDER_DELIVERD, TYPE_ORDER_PAID } from "../types";



export const getAllUserOrders = (page,limit) => async(dispatch)=>{
    try {
    const res=await useGetDataToken(`/api/v1/orders?limit=${limit}&page=${page}`)
  dispatch({type:GET_ALL_USER_ORDERS,payload:res})
} catch (e) {
    dispatch({ type: GET_ERROR, payload: "Error" + e });
  }
}

export const getOneOrder = (id) => async(dispatch)=>{
  try {
  const res=await useGetDataToken(`/api/v1/orders/${id}`)
dispatch({type:GET_ONE_ORDER,payload:res})
} catch (e) {
  dispatch({ type: GET_ERROR, payload: "Error" + e });
}
}


export const updateOrderStatePaid = (id) => async(dispatch)=>{
  try {
  const res=await useUpdateData(`/api/v1/orders/${id}/pay`)
dispatch({type:TYPE_ORDER_PAID,payload:res})
} catch (e) {
  dispatch({ type: GET_ERROR, payload: "Error" + e });
}
}



export const updateOrderStateDeliverd = (id) => async(dispatch)=>{
  try {
  const res=await useUpdateData(`/api/v1/orders/${id}/deliver`)
dispatch({type:TYPE_ORDER_DELIVERD,payload:res})
} catch (e) {
  dispatch({ type: GET_ERROR, payload: "Error" + e });
}
}