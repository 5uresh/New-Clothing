import { createContext ,useState,useEffect} from "react";
import { onAuthStateChangedListener,signOutUser,createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
//actual value u want to access
export const UserContext = createContext({
    currentUser : null,
    setCurrentUser: () =>{}
})

export const UserProvider =({children}) =>{

    const [currentUser,setCurrentUser] = useState(null)
    const value = {currentUser,setCurrentUser}
    // signOutUser();
    useEffect(() =>{
        const unsubcribe = onAuthStateChangedListener((user) =>{
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user)})
        return unsubcribe
    },[]);
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}