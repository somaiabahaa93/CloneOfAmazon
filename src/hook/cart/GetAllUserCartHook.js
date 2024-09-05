import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notify from "../../hook/notificationHook";
import { getAllUserCartItems } from '../../Redux/actions/cartActions';

const GetAllUserCartHook = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [itemsNum, setItemsNum] = useState(0)
    const [cartId, setCartId] = useState(0)

    const [cartItems, setCartItems] = useState([])
    const [couponNameRes, setCouponName] = useState('')
    const [totalCartPrice, setTotalCartPrice] = useState(0)
    const [totalCartPriceAfterDiscount, setTotalCartPriceAfterDiscount] = useState(0)

    useEffect(() => {
        const get = async () => {
            setLoading(true)
            await dispatch(getAllUserCartItems())
            setLoading(false)
        }
        get()
    }, [])
    const res = useSelector(state => state.cartReducer.getAllUserCart)
    console.log("itemsNum************************************",res)

    useEffect(() => {
        if (loading === false) {
            if (res && res.message === "success") {
                setItemsNum(res.totalItemsNumber)
                setCartItems(res.data.cartItems)
                setCartId(res.data._id)

                setTotalCartPrice(res.data.totalCartPrice)



                if (res.data.coupon) {
                    setCouponName(res.data.coupon)
                } else {
                    setCouponName('')
                }
                if (res.data.totalPriceAfterDiscount) {
                    setTotalCartPriceAfterDiscount(res.data.totalPriceAfterDiscount
                        )
                } else {
                    setTotalCartPriceAfterDiscount('')
                }

            } else {
                setCouponName('')
                setTotalCartPriceAfterDiscount('')
                setItemsNum(0)
                setCartItems([])
                setTotalCartPrice(0)
            }

        }
    }, [loading])


    return [itemsNum, cartItems, totalCartPrice, couponNameRes, totalCartPriceAfterDiscount,cartId]
}

export default GetAllUserCartHook
