import { useEffect, useState } from "react"

const Game = props => {

    const { questionArray, setQuestionArray, gameQuestions, setGameQuestions } = props

    const [ currentQuestion, setCurrentQuestion ] = useState({})

    const [ currentAnswers, setCurrentAnswers ] = useState([])

    if (questionArray.length > 0) {
        // setCurrentQuestion(questionArray[0])

    }

    // console.log(currentAnswers)

    // const { question, category, difficulty, correct_answer, incorrect_answers } = questionArray[0]

    // Initialize gameQuestions from original questionArray
    // console.log(questionArray[0])

    // console.log(gameQuestions)


    // JUST SOME SCRATCH STUFF TO MAKE SENSE OF RANDOMIZING THE ANSWER ARRAY SO THE CORRECT ANSWER ISN'T IN THE SAME POSITION FOR EACH QUESTION. 
    // This is only needed for m/c questions.

    // let answers = []

    // if (questionArray.length > 0) {

        
    //     answers.push(questionArray[0].correct_answer)
        
    //     console.log(answers)
        
    //     questionArray[0].incorrect_answers.forEach(answer => {
    //         answers.push(answer)
    //     })
    //     console.log(answers)
    // }

    // let randomAnswers = []

    // for (let i = 0; i < answers.length; i++) {
    //     let randomIndex = (Math.floor(Math.random() * answers.length))
        
    //     randomAnswers.push(answers[randomIndex])
    //     answers.slice(randomIndex, 1)
    // }

    // console.log(randomAnswers)

    // ==============================================================
    
    
    function newGameHandler() {
        setQuestionArray(null)
    }

    return (
        <>
            <section className='gameSection'>
                <div className="wrapper">
                    <div className="gameHeading">
                        <h2>Get ready to play!</h2>
                        <div className="gameButtons">
                            <button onClick={newGameHandler}>Save game</button>
                            <button onClick={newGameHandler}>New game</button>
                        </div>
                    </div>
                    <ul className="questionList">
                        {
                            questionArray.map((individualQuestion, index) => {
                                return (
                                    <li className="individualQuestion" key={index}>
                                            <h3>
                                                {individualQuestion.question}
                                            </h3>
                                            <ul className="questionInfo">
                                                <li>
                                                    {individualQuestion.category}
                                                </li>
                                                <li>
                                                    {individualQuestion.difficulty}
                                                </li>
                                            </ul>
                                            <ul className="answers">
                                                {individualQuestion.correct_answer}
                                                {individualQuestion.incorrect_answers}
                                            </ul>
                                        </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Game