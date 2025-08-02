import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  dummyproducts, vendorDetails } from "../assets/assets";
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
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [vendors, setVendors] = useState({})

    // fn to fetch products
    const fetchproducts=async()=>{
        setProducts(dummyproducts)
        setCartItems({}) // Initialize as empty object, not the products array
        setVendors(vendorDetails)
    }
    //call it whenever a component is called
    //useEffect hook

    useEffect(()=>{
        fetchproducts()

    },[])
    
// add product to cart
const addtoCart=(ItemId)=>{
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
        if(cartdata[ItemId] <= 0){
            delete cartdata[ItemId]
        }
    }
    toast.success("Removed from cart")
    setCartItems(cartdata)
}

// fn to clear cart
const clearCart = () => {
    setCartItems({});
    toast.success("Cart cleared");
}

// fn to get vendors by category
const getVendorsByCategory = (category) => {
    const categoryKey = category.toLowerCase();
    return vendors[categoryKey] || [];
}

// fn to set selected category
const selectCategory = (category) => {
    setSelectedCategory(category);
}

// fn to get vendor details
const getVendorDetails = (vendorId) => {
    for (const category in vendors) {
        const vendor = vendors[category].find(v => v.id === vendorId);
        if (vendor) return vendor;
    }
    return null;
}

// fn to get product with vendor details
const getProductWithVendor = (productId) => {
    for (const category in vendors) {
        const categoryVendors = vendors[category];
        for (const vendor of categoryVendors) {
            const product = vendor.products.find(p => p._id === productId);
            if (product) {
                return {
                    ...product,
                    vendor: vendor
                };
            }
        }
    }
    return null;
}

// fn to get all products with vendor details
const getAllProductsWithVendors = () => {
    const allProducts = [];
    Object.values(vendors).forEach(categoryVendors => {
        categoryVendors.forEach(vendor => {
            vendor.products.forEach(product => {
                allProducts.push({
                    ...product,
                    vendor: vendor
                });
            });
        });
    });
    return allProducts;
}

const value = {
    navigate,
    user,
    setUser,
    setisSeller,
    isSeller,
    showUserLogin,
    setshowUserLogin,
    products,
    addtoCart,
    updateCartItems,
    removeItem,
    clearCart,
    CartItems,
    selectedCategory,
    selectCategory,
    getVendorsByCategory,
    getVendorDetails,
    getProductWithVendor,
    getAllProductsWithVendors,
    vendors
}

return <AppContext.Provider value={value}>
    {children}
</AppContext.Provider>
}

// thhen expoert and use it
export const UseAppContext=()=>{
    return useContext(AppContext)
}