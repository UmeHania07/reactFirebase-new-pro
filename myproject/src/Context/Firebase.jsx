import { createContext, useContext, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import {
    getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged
}
    from 'firebase/auth'
import { getFirestore, collection, addDoc, getDocs, doc, getDoc} from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'




const FirebaseContext = createContext(null)

const firebaseConfig = {
    apiKey: "AIzaSyAXibQJlLxFlA_BmvI1fLEFq-An6KXN05A",
    authDomain: "bookies-25e9f.firebaseapp.com",
    projectId: "bookies-25e9f",
    storageBucket: "bookies-25e9f.appspot.com",
    messagingSenderId: "951737896240",
    appId: "1:951737896240:web:7d6d9fd283fb88c1384cf5"
};


export const UseFirebaseContext = () => useContext(FirebaseContext)

const FirebaseApp = initializeApp(firebaseConfig)
const FirebaseAuth = getAuth(FirebaseApp)

const Firestore = getFirestore(FirebaseApp)
const Storage = getStorage(FirebaseApp)

const Google = new GoogleAuthProvider()


export const FirebaseProvider = (props) => {


    const [user, setUser] = useState(null)

    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        })
    }, [])
    

    const signUpEandP = (email, password) =>
        createUserWithEmailAndPassword(FirebaseAuth, email, password)


    const signInEandP = (email, password) =>
        signInWithEmailAndPassword(FirebaseAuth, email, password)

    const SigninwithGoogle = () => signInWithPopup(FirebaseAuth, Google)

    const handleCreateNewList = async (name, isbn, price, cover) => {
        const imgRef = ref(Storage, `uploads/images/${Date.now()}-${cover}`)
        //yeha pr image ka path hoga
        const uploadResult = await uploadBytes(imgRef, cover)
        // or yaha pe hum apni image path or baki details rakhy gy
        return await addDoc(collection(Firestore, 'books'), {

            //mai koi bhi console se property get krskhti hu
            name,
            isbn,
            price,
            imageURL: uploadResult.ref.fullPath,
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL

        })
    }
    const isLoggedIn = user ? true : false;

    const ListAllBooks = () => {
        return getDocs(collection(Firestore, 'books'))
    }

    const getDocument = async (id) => {
        const docRef = doc(Firestore, 'books', id);
        //ek single document k liye h 
        const result = await getDoc(docRef);
        return result;
    }

    const getImageURL = (path) => {
        return getDownloadURL(ref(Storage, path))
    }

    const placeOrder = async (bookId, qty) => {
        const collectionRef = collection(Firestore, 'books', bookId, 'orders');
        const result = await addDoc(collectionRef, {

            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            qty: Number(qty)

        })

        return result

    }

    return (

        <FirebaseContext.Provider value={{
            signUpEandP,
            signInEandP,
            SigninwithGoogle,
            handleCreateNewList,
            ListAllBooks,
            getImageURL,
            getDocument,
            placeOrder,
            isLoggedIn,
            
        }}>
            {props.children}
        </FirebaseContext.Provider>

    )
}
