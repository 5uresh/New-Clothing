import {initializeApp} from 'firebase/app'
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged} from 'firebase/auth'

import {getFirestore,doc,getDoc,setDoc,collection,writeBatch,query,getDocs} from 'firebase/firestore'

 const firebaseConfig = {
    apiKey: "AIzaSyArBLEm9GRlTM5eGaHc4C4FVCZVG7cHqF8",
    authDomain: "new-clothing-db-60b4b.firebaseapp.com",
    projectId: "new-clothing-db-60b4b",
    storageBucket: "new-clothing-db-60b4b.appspot.com",
    messagingSenderId: "917511993810",
    appId: "1:917511993810:web:49ac0ed7674bd842f0b00b"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleprovider = new GoogleAuthProvider();
  googleprovider.setCustomParameters({
    prompt:"select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,googleprovider);
  export const signInWithGoogleRedirect = () => signInWithGoogleRedirect(auth,googleprovider);

  export const db = getFirestore();

  export const addCollectionAndDocuments = async(collectionKey,objectsToAdd,field) =>{
    const collectionRef = collection(db,collectionKey)
    const batch = writeBatch(db)

    objectsToAdd.forEach((object)=>{
      const docRef = doc(collectionRef ,object.title.toLowerCase());
      batch.set(docRef,object)

    })
    await batch.commit();
    console.log('done')
  } 

  export const getCategoriesAndDocuments = async () =>{
    const collectionRef = collection(db,`categories`)
    const q = query(collectionRef)
    const querySnapshot = await getDocs(q)
    const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot) => {
      const {title,items} = docSnapshot.data()
      acc[title.toLowerCase()] = items;
      return acc;
    },{})

    return categoryMap
  }

  export const createUserDocumentFromAuth = async (userAuth,additionalInformation={}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
  
    const userSnapshot = await getDoc(userDocRef);
  
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
  
    return userDocRef;
  };

//   export const db = getFirestore();

//   export const createUserDocumentFromAuth = async (userAuth) =>{
//     const userDocRef = doc(db,'user', userAuth.uid);
//     console.log(userDocRef)

//     const userSnapshot = await getDoc(userDocRef);
//     console.log(userSnapshot)
//     console.log(userSnapshot.exists())

//     if(!userSnapshot.exists()){
//         const { displayName, email} = userAuth;
//         const createdAt  = new Date();
//         try{
//             await setDoc(userDocRef,{
//                 displayName,
//                 email,
//                 createdAt
//             })
//         }catch (error){
//             console.log('error creating the user',error.message)
//         }

//     }
//     return userDocRef;

//   }

export const createAuthUserWithEmailAndPassword = async (email,password) =>{
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth,email,password)
}
export const siginAuthUserWithEmailAndPassword = async (email,password) =>{
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth,email,password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener =(callback) => onAuthStateChanged(auth,callback)