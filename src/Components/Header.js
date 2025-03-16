import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user)
    const handleSignOut = () => {
        signOut(auth).then(() => {
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        navigate("/error")
        });
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            const {uid, email, displayName, photoURL} = user;
            dispatch(addUser({uid:uid, email:email, displayName: displayName , photoURL:photoURL}));
            navigate("/browse")
        } 
        else {
            dispatch(removeUser())
            navigate("/")
            // User is signed out
        }
        });
        
        //unsubscribe when unmount
        return () => unsubscribe();
    },[])

    return(
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
           <img 
            className="w-44"
           src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo"/>

            {user && <div className="flex">
               <button className="text-white my-4 bg-red-500 hover:bg-red-600 px-4 h-8 rounded" onClick={handleSignOut}>Sign out</button>
            </div>}
        
        </div>
    )
}

export default Header;