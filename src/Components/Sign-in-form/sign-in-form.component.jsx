import { useState} from "react"

import { signInWithGooglePopup,createUserDocumentFromAuth,siginAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils"

import './sign-in-form.styles.scss'
import Button, { BUTTON_TYPES_CLASSES } from '../Button/button.component'


import FormInput from "../Form-input/form-input.component"

import { UserContext } from "../../Contexts/user.context"

const defaultFormFields = {
   
    email:'',
    password:'',
    
}

const SignInForm = () =>{
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {email,password} = formFields;
    
    // const {setCurrentUser} = useContext(UserContext);

    const resetFormFields = ()=>{
        setFormFields(defaultFormFields)
    }
    const handleSubmit = async(event) =>{
        event.preventDefault();
      
        
        try{
            const {user} = await siginAuthUserWithEmailAndPassword(email,password)
            // setCurrentUser(user);
            
           resetFormFields() 
        }catch(error){


            switch(error.code){
                case 'auth/wrong-password':
                alert('incorrect password for email');
                break;
                case 'auth/user-not-found':
                alert('No user associate with this email')
                break;
                default:
                    console.log(error)

            }
           
            
        }
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
        // setCurrentUser(user)
        
      };
  
    const handleChange = (event) =>{
        const {name,value} = event.target
        setFormFields({...formFields,[name]:value})

    }
    return(
        <div className="sign-in-container">
            <h2>Already have an account</h2>
            <span>Sign in with your Email and Password</span>
            <form onSubmit={handleSubmit}>
                
               

                
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}></FormInput>

                
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}></FormInput>

               <div className='buttons-container'>
               <Button buttonType="inverted" type="submit"> Sign In</Button>
               <Button type='button' buttonType={BUTTON_TYPES_CLASSES.google} onClick={signInWithGoogle} >Google Sign In</Button>
               </div>
                
            </form>
        </div>
    )
}

export default SignInForm