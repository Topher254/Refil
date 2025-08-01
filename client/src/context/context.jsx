import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  dummyproducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();
// then create a provider function

export const AppContextProvider =({children})=>{
    // navigation fn
    const navigate = useNavigate();
    const [user,setUser] = useState(null)
    const [isSeller,setisSeller] = useState(false)
    const [showUserLogin,setshowUserLogin] = useState(false)
    const [products,setProducts] = useState([])
    const [CartItems,setCartItems] = useState({})

    // fn to fetch prodycts
    const fetchproducts=async()=>{
        setProducts(dummyproducts)
        setCartItems(dummyproducts)
    }
    //call it whenever a component is called
    //useEffect hook

    useEffect(()=>{
        fetchproducts()

    },[])
    
// add product to cart
const addtoCart=()=>{
    let cartdata = structuredClone(CartItems);
    if(cartdata[ItemId]){
        cartdata[ItemId]+=1
    }else{
        cartdata[ItemId] =1;
    }
    setCartItems(cartdata);
    // add notification
    toast.success('Added to cart')
}
// fn to update 

const updateCartItems=(ItemId,quantity)=>{
    let cartdata =structuredClone(CartItems);
    cartdata[ItemId]=quantity;
    setCartItems(cartdata);
    toast.success("Cart Updated")
}
// fn to remove
const removeItem=(ItemId)=>{
    let cartdata= structuredClone(CartItems);
    if (cartdata[ItemId]){
        cartdata[ItemId]-=1;
        if(cartdata[ItemId]){
            delete cartdata[ItemId]
        }
    }
    toast.success("Removed from cart")
    setCartItems(cartdata)
}



const value = {navigate,user,setUser,setisSeller,isSeller,showUserLogin,
    setshowUserLogin,products,addtoCart,updateCartItems,removeItem,CartItems}


return <AppContext.Provider value={value}>
    {children}
</AppContext.Provider>
}

// thhen expoert and use it
export const UseAppContext=()=>{
    return useContext(AppContext)
}