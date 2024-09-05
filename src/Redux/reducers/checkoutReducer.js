import {  CREATE_CASH_ORDER,CREATE_CARD_ORDER } from "../types"
const initial={cashOrder:[],loading:true,cardOrder:[]}
const CheckoutReducer=(state=initial,action)=>{
    switch(action.type)
    {
        
            case CREATE_CASH_ORDER:
                {
                    return {
                        ...state,
                        cashOrder:action.payload,
                        loading:false
                    }
                }
                case CREATE_CARD_ORDER:
                {
                    return {
                        ...state,
                        cardOrder:action.payload,
                        loading:false
                    }
                }
               
            default:
                return state;
    }

}

export default CheckoutReducer