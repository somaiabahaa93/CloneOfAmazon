import { GET_ERROR, CREATE_CASH_ORDER,CREATE_CARD_ORDER} from "../types";

import { useGetData, useGetDataToken } from "../../Hooks/useGetData";
import { useInsertData,  } from "../../Hooks/useInsertData";


// create a cash order
export const createCashOrder = (cartId,body) => async (dispatch) => {
    try {
      // const res = await baseURL.get("/api/v1/categories");
      const res= await useInsertData(`/api/v1/orders/${cartId}`,body)
      dispatch({ type:CREATE_CASH_ORDER, payload: res });
    } catch (e) {
      dispatch({ type: GET_ERROR, payload: "Error" + e });
    }
  };


  // create a card order
export const createCardOrder = (cartId,body) => async (dispatch) => {
  try {
    // const res = await baseURL.get("/api/v1/categories");
    const res= await useGetDataToken(`/api/v1/orders/checkout-session/${cartId}`,body)
    console.log("cardressss",res)
    dispatch({ type:CREATE_CARD_ORDER, payload: res });
  } catch (e) {
    dispatch({ type: GET_ERROR, payload: "Error" + e });
  }
};