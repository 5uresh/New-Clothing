import { useContext } from 'react'
import { CartContext } from '../../Contexts/cart.context'

import { useNavigate } from 'react-router-dom'

import {CartDropdownContainer,EmptyMessage,CartItems} from './cart-dropdown.styles'
import Button,{BUTTON_TYPES_CLASSES} from '../Button/button.component';

import CartItem from '../Cart-item/cart-item.component'

const CartDropdown = () =>{

    const {cartItems} = useContext(CartContext)
    const navigate = useNavigate()
    const gotoCheckOutHandler = () =>{
        navigate('/Checkout')
    }
    return(
        <CartDropdownContainer> 
            <CartItems>


                { cartItems.length ?(
                    cartItems.map(item=> <CartItem key={item.id} cartItem={item}/>)
                ):(
                    <EmptyMessage>Your Cart is Empty</EmptyMessage>
                )}

            </CartItems>
            <Button  onClick={gotoCheckOutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown