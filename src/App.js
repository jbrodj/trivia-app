import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

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

// Components
import Header from './Components/Header';
import QueryForm from './Components/QueryForm';
import Game from './Components/Game';

function App() {

  // State for login/signup data
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // User state will be used to track and display the current user
  const [user, setUser] = useState({})
  
  // State to hold array of current trivia game questions
  const [ questionArray, setQuestionArray ] = useState([])
  // State to hold the disposable questions that will be thrown out as user answers each question. Separate so that questionArray can hold onto the original unmodified list of questions. 
  const [ gameQuestions, setGameQuestions ] = useState([])


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
      <main>
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
      </main>
    </div>
  );
  } else {
    return (
      <>
      <Header user={user} logout={logout} />
        <main>
          {
            questionArray === null ?
            <QueryForm 
              setQuestionArray={setQuestionArray} 
              questionArray={questionArray}
              gameQuestions={gameQuestions}
              setGameQuestions={setGameQuestions}
            />
            : 
            <ul>
              <Game questionArray={questionArray} setQuestionArray={setQuestionArray}/>
            </ul>
          }

            </main>
      </>
    )
  }
}

export default App;
