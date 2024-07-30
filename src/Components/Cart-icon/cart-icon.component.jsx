import { useContext } from 'react'

import { CartContext } from '../../Contexts/cart.context'
import {ShoppingIcon,CartIconContainer,ItemCount} from './cart-icon.styles'

const CartIcon = () =>{
    const {isCartOpen,setIsCartOpen,cartCount} = useContext(CartContext);
    const toggleCartOpen = () => setIsCartOpen(!isCartOpen)
    return(
        <CartIconContainer onClick={toggleCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount className='item-count'>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}
export default CartIcon