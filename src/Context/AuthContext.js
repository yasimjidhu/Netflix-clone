import { useContext, createContext, useEffect, useState } from "react";
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { collection, addDoc,setDoc,doc } from 'firebase/firestore'

const AuthContext = createContext()

export function AuthContextProvider({ children }) {

    const [user, setUser] = useState({})

    // Assuming 'db' is your Firestore instance
    const usersCollection = collection(db, 'users');


    async function signup(email, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('userCredentials', userCredential);
            const user = userCredential.user;
            
            // Create a document for the user in the 'users' collection with the email as the custom ID
            await setDoc(doc(usersCollection, email), {
                email: user.email,
                savedShows: []
            });
        } catch (error) {
            console.error("Error signing up: ", error.message);
        }
    }



    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsubscribe()
        }
    })


    return (
        <AuthContext.Provider value={{ signup, login, logout, user }} >
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth() {
    return useContext(AuthContext)
}


