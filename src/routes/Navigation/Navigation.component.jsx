import { Fragment,useContext } from "react"
import { Link, Outlet } from "react-router-dom"
import CartIcon from "../../Components/Cart-icon/cart-icon.component";
import CartDropdown from "../../Components/Cart-dropdown/cart-dropdown.component";
import { ReactComponent as CrwnLogo } from '../../assests/crown.svg';
import {NavigationContainer,NavLinks,NavLink,LogoContainer} from './Navigation.styles.jsx'

// import Athentication from "../Athentication/Athentication.component"; 
import { UserContext } from "../../Contexts/user.context";
import { CartContext } from "../../Contexts/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";


const Navigation =() =>{
  const {currentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext)
  // const signOutHandler = async() =>{
  //   const res = await signOutUser();
  //   setCurrentUser(null);
  //   console.log(res)
  // }
    return (
      <Fragment>
        <NavigationContainer>
        
        <LogoContainer to='/'>
        <CrwnLogo className='logo'/>
        </LogoContainer>
          <NavLinks>
            <NavLink to='/shop'>SHOP </NavLink>
            <NavLink className="nav-link" to='/contact'>CONTACT </NavLink>

            {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to='/signIn'>SIGN IN</NavLink>
          )}
            <CartIcon/>
          </NavLinks>
            {isCartOpen && <CartDropdown/>}
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    )
  }


  export default Navigation