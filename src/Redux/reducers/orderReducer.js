import {  GET_ALL_USER_ORDERS,GET_ONE_ORDER, TYPE_ORDER_DELIVERD, TYPE_ORDER_PAID} from "../types"
const initial={allUserOrders:[],oneOrder:[],orderPaid:[],orderDeliverd:[],loading:true}
const OrderReducer=(state=initial,action)=>{
    switch(action.type)
    {
        case GET_ALL_USER_ORDERS:
            {
                return {
                    ...state,
                    allUserOrders:action.payload,
                    loading:false
                }
            }
            case GET_ONE_ORDER:
            {
                return {
                    ...state,
                    oneOrder:action.payload,
                    loading:false
                }
            }
            case TYPE_ORDER_PAID:
                {
                    return {
                        ...state,
                        orderPaid:action.payload,
                        loading:false
                    }
                }
                case TYPE_ORDER_DELIVERD:
                    {
                        return {
                            ...state,
                            orderDeliverd:action.payload,
                            loading:false
                        }
                    }
           
            default:
                return state;
    }

}

export default OrderReducer