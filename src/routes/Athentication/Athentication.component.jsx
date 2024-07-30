import { useEffect } from 'react';
import {auth,signInWithGooglePopup,createUserDocumentFromAuth,signInWithGoogleRedirect} from '../../utils/firebase/firebase.utils'
import { getRedirectResult } from 'firebase/auth';
import './Athentication.styles.scss'
import SignUpForm from '../../Components/Sign-up-form/sign-up-form.component';
import SignInForm from '../../Components/Sign-in-form/sign-in-form.component';



const Athentication = () => {
    // useEffect(async ()=>{
    //     const response = await getRedirectResult(auth)
    //     console.log(response);

    //     if(response){
    //         const userDocRef = await createUserDocumentFromAuth(response.user)
    //     }
    // },[])
   

    return (
      <div className='athentication-container'>
      
        {/* <button onClick={logGoogleUser}>Sign in with Google Popup</button> */}
        <SignInForm/>
        <SignUpForm/>
        {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
      </div>
    );
  };
  
  export default Athentication;