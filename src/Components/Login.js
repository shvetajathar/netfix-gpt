import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
    const [isSignInForm,setIsSignInForm] = useState(true);
    const [errorMessage,setErrorMessaage] = useState(null);
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    } 
    const handleButtonClick = () => {
        const message = checkValidData(email.current.value,password.current.value);
        setErrorMessaage(message)
        if(message) return;
        if(!isSignInForm){
            //sign Up
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
                  }).then(() => {
                    const {uid, email, displayName, photoURL} = auth.currentUser;
                    dispatch(addUser({uid:uid, email:email, displayName: displayName , photoURL:photoURL}));
                    // Profile updated!
                    navigate("/browse")
                    // ...
                  }).catch((error) => {
                    // An error occurred
                    setErrorMessaage(error.message)
                    // ...
                  });
                console.log("user",user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessaage(errorMessage)
                // ..
            });
        }
        else{
            //sign In
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                navigate("/browse")
                console.log("login user",user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessaage(errorMessage)
            });
        }
    }
     return(
        <div>
            <Header />
            <div className="absolute">
                <img
                src="https://assets.nflxext.com/ffe/siteui/vlv3/42a0bce6-fc59-4c1c-b335-7196a59ae9ab/web/IN-en-20250303-TRIFECTA-perspective_d5f81427-d6cf-412d-8e86-2315671b9be1_small.jpg" alt="bg-img" />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
                <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In":"Sign Up"}</h1>
                {!isSignInForm &&
                <input ref={name} type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700" />}
                <input ref={email} type="text" placeholder="Email Address" className="p-4 my-4 w-full bg-gray-700" />
                <input ref={password} type="Password" placeholder="Password" className="p-4 my-4 w-full bg-gray-700" />
                <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
                <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm ? "Sign In":"Sign Up"}</button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now":"Already Registered. Login Now"}</p>
            </form>
        </div>
    )
}

export default Login;