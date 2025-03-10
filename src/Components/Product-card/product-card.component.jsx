import './product-card.styles.scss'
import { useContext } from 'react'
import Button,{BUTTON_TYPES_CLASSES} from '../Button/button.component';
import { CartContext } from '../../Contexts/cart.context'

const ProductCard = ({product}) =>{
    const {name,price,imageUrl} = product;
    const {addItemToCart} = useContext(CartContext)
    const addProductToCart = () => addItemToCart(product)
    return(
    <div className='product-card-container'>
        <img src={imageUrl} alt={`${name}`}/>
        <div className='footer'>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
        </div>
        <Button buttonType={BUTTON_TYPES_CLASSES.inverted} onClick={addProductToCart} >Add to Cart</Button>
    </div>)
}

export default ProductCard