// Todo
// ===== Fixes =====
  // Find answer to unsubscribe on category dropdown. 
    // Method previously tried isn't working, and error still occurs when component unmounts. 
  // Can't remember the set state issue that was happening before > maybe good idea to read docs on that to be fresh. 
  // Probably also want to go through comments and update some of them. 

// ===== Pseudocode =====
  // === Answers data ===
  // Finish building object for storing answers for each question in a randomized order (so correct question isn't in the same position each time)
    // General idea is mostly there.
    // This randomization shouldn't run if the question is true/false. 
      // Conditional to check the question type property on the question object, and not run if true/false == true.

  // === Current Question View ===
  // Build a new view for just the current question and possible answers. 
    // Just want to show one question at a time, allow user to select answer and submit.
    // Selected answer can be tracked in state, and checked against the correctAnswer in the original question object. 
    // Submitting should tell the user whether they got the question correct or not, and let them start the next question. 
    // There should be an element that displays which question the user is on (ie. Question 1 / 10)

  // === Results View ===
  // Getting to the end of the quiz should launch a results view. 
    // After submitting the last question, the user should see their overall result. 
      // Result should show number and/or % correct, and details about the game.
        // Ie. topics, difficulty, etc. 
          // Maybe there's a way to quantify & display the average difficulty of the questions for quizzes that have random difficulty. 
            // Assign 1, 2, 3 to easy, med, diff, calculate average, round to closest and display whichever difficulty that corresponds to. 
            // Or a difficulty scale that shows a position along a continuum from easy to difficult based on that average. 

  // === Saved Games View & Save functionality ===
  // Component for displaying saved games
    // The quiz view should have a button that allows users to save a game in its current state.
      // Both at the start of the game, and during the game.
    // The all of the views should have a button that allows users to view public saved games.
    // Link to realtime database for the games.
      // DB needs to have a node for each user, so users can store games privately. 
        // Access the user's email or auth id to use as identifier
        // Going to have to read up on how to create nodes like that in Firebase again - can't remember. 
      // Should also have a public node so functionality can be seen without loggin in. 
    // Want to save the user's progress in the game
      // Maybe save the unaltered original questions object, and a current one with completed questions discarded. OR track the # of the current question so that loads when the user re-loads the game. 
    // What information should be in the saved games view?
      // Should it be an object that contains the questions/game object, with other data like # or % completed, topic, etc?
      // Or just straight up link to the game object. 

    // === Styling ===
    // Styles for the header and query, game, saves views. 
      // Find color scheme
      // Decide on button type/style
      // Fonts for headings and copy
      // How to delineate/decorate the question/answer container, saved games container, etc. 




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
