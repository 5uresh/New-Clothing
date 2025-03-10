import { createContext,useState,useEffect } from "react";


const addCartItem = (cartItems,productToAdd) =>{
    //find if cartitems contains productToAdd

    const existingCartItem = cartItems.find((cartItem)=>cartItem.id===productToAdd.id)

    //if found, increment quantity
    if(existingCartItem){
        return cartItems.map((cartItem)=>
        cartItem.id===productToAdd.id
    ? {...cartItem,quantity:cartItem.quantity+1}
    : cartItem)
    }

    //return new array with modified carItems/ new car item

    return [...cartItems,{...productToAdd,quantity:1}];
}
const removeCartItem = (carItems,cartItemToRemove) =>{
    //find the cart item to remove
    const existingCartItem = carItems.find((cartItem)=>cartItem.id===cartItemToRemove.id)

    //check if quantity is equal to 1, if it is remove that item form cart
    if(existingCartItem.quantity === 1){
        return carItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)

    }
    //return back cartitems with matching cart item with reduced quantity
    return carItems.map((cartItem)=>
        cartItem.id===cartItemToRemove.id
    ? {...cartItem,quantity:cartItem.quantity-1}
    : cartItem)
}

const clearCartItem =(cartItems,cartItemToClear) =>cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)

export const CartContext  = createContext({
    isCartOpen:false,
    setIsCartOpen:() =>{},
    cartItem:[],
    addItemToCart:() =>{},
    removeItemFromCart:() =>{},
    clearItemFromCart:() =>{},
    cartCount: 0,
    CartTotal:0
})

export const CartProvider =({children}) =>{
const [isCartOpen, setIsCartOpen] = useState(false);
const [cartItems,setCartItems] = useState([]);
const [cartCount,setCartCount] = useState(0)
const [cartTotal,setCartTotal] = useState(0)

useEffect(()=>{const newCartCount = cartItems.reduce((total,cartItem)=>total + cartItem.quantity, 0)
    setCartCount(newCartCount)},[cartItems])

useEffect(()=>{const newCartTotal = cartItems.reduce((total,cartItem)=>total + cartItem.quantity * cartItem.price, 0)
     setCartTotal(newCartTotal)},[cartItems])


const addItemToCart =(productToAdd)=>{
    setCartItems(addCartItem(cartItems,productToAdd));
}

const removeItemToCart =(cartItemToRemove)=>{
    setCartItems(removeCartItem(cartItems,cartItemToRemove));
}
const clearItemFromCart =(cartItemToClear)=>{
    setCartItems(clearCartItem(cartItems,cartItemToClear));
}

const value = {isCartOpen,setIsCartOpen,addItemToCart,removeItemToCart,cartItems,cartCount,clearItemFromCart,cartTotal}
return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}