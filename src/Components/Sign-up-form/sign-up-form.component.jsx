import { useState } from "react"



import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

import './sign-up-form.styles.scss'

import Button from "../Button/button.component"
import FormInput from "../Form-input/form-input.component"
 

const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}

const SignUpForm = () =>{
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {displayName,email,password,confirmPassword} = formFields;
    // const {setCurrentUser} = useContext(UserContext);
    

    const resetFormFields = ()=>{
        setFormFields(defaultFormFields)
    }
    const handleSubmit = async(event) =>{
        event.preventDefault();
        if(password !== confirmPassword){
            alert('password doesnt match');
            return;
        }
        
        try{
            const {user} = await createAuthUserWithEmailAndPassword(
                email,
                password);
                // setCurrentUser(user);
            await createUserDocumentFromAuth(user,{displayName})
           resetFormFields(); 
        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email id is already in use')
            }
            else{ console.log('User creation encountered the error',error)}
           
        }
    }

    const handleChange = (event) =>{
        const {name,value} = event.target
        setFormFields({...formFields,[name]:value})

    }
    return(
        <div className="sign-up-container">
            <h2>Don't you an account</h2>
            <span>Sign up with your Email and Password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName}></FormInput>

                
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}></FormInput>

                
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}></FormInput>

               
                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}></FormInput>
                <Button  type="submit"> Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm