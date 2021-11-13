import './App.css';
import { useState } from 'react';
// Firebase function imports
import {
    // For tracking change in auth state to keep track of logged in user
  onAuthStateChanged,
  // For generating new user within firebase auth
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { auth } from './firebase-config'
import Header from './Components/Header';
import QueryForm from './Components/QueryForm';

function App() {

  // State for 
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  // User state will be used to track and display the current user
  const [user, setUser] = useState({})

  // Handle user login change using firebase's auth state change tracker.
  onAuthStateChanged(auth, (currentUser) => {
    // 
    setUser(currentUser)
  })

  // console.log(user?.email)

  // Handle creating new user with firebase createUser... function - passing it the auth function from firebase config and the register state.
  const register = async (event) => {
    event.preventDefault()
    try {
    const user = await createUserWithEmailAndPassword(
      auth, 
      registerEmail,
      registerPassword
    )
    // console.log(user)
  } catch (error) {
    console.log(error.message);
  }
};

// Handle loggin in an existing user with firebase signIn... function - passing it the auth function from firebase config and the login state.
  const login = async (event) => {
    event.preventDefault()
    try {
    const user = await signInWithEmailAndPassword(
      auth, 
      loginEmail,
      loginPassword
    )
    // console.log(user)
  } catch (error) {
    console.log(error.message);
  }
  };

  // handle sign out button click using Firebase's signOut function
  const logout = async () => {
    await signOut(auth)
  };

  if ( user === null) {

  // JSX for login and sign-up forms
  return (
    <div className="wrapper">
      <Header user={user} logout={logout} />
      <div className="authForm">
        <form>
          <h3>I'm a new user!</h3>
          <label 
            htmlFor="registerEmail" className="sr-only">Email</label>
          <input 
            type="text" 
            placeholder="Email..." 
            id="registerEmail" 
            onChange={(event) => {setRegisterEmail(event.target.value)}}
          />
          <label htmlFor="registerPassword" className="sr-only">Password</label>
          <input 
            type="text" 
            placeholder="Password..." 
            id="registerPassword"
            onChange={(event) => {setRegisterPassword(event.target.value)}}
            />
          <button onClick={register}>Create Account</button>
        </form>

        <form>
          <h3>I have an account!</h3>
          <label htmlFor="loginEmail" className="sr-only">Email</label>
          <input 
            type="text" 
            placeholder="Email..." 
            id="loginEmail" 
            onChange={(event) => {setLoginEmail(event.target.value)}}
          />
          <label htmlFor="loginPassword" className="sr-only">Password</label>
          <input 
            type="text" 
            placeholder="Password..." 
            id="loginPassword"
            onChange={(event) => {setLoginPassword(event.target.value)}}
          />
          <button onClick={login}>Sign In</button>
        </form>

      </div>
    </div>
  );
  } else {
    return (
      <>
        <Header user={user} logout={logout} />
        <QueryForm />
      </>
    )
  }
}

export default App;
