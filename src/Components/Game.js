import { useEffect, useState } from "react/cjs/react.development"

const Game = props => {

    const { questionArray, setQuestionArray, gameQuestions, setGameQuestions } = props

    const [ currentQuestion, setCurrentQuestion ] = useState({})

    // const { question, category, difficulty, correct_answer, incorrect_answers } = questionArray[0]

    // Initialize gameQuestions from original questionArray
    // console.log(questionArray[0])


    // console.log(questionArray[0].correct_answer)
    // console.log(questionArray[0].incorrect_answers)

    // useEffect(() => {
    //     setGameQuestions(gameQuestions)
    //     console.log('use effect')
    // }, [questionArray])
    // console.log(gameQuestions)

    function newGameHandler() {
        setQuestionArray(null)
    }



    return (
        <>
            <h2>Game hereeeee</h2>
            <button onClick={newGameHandler}>New game</button>
            <section className='questionSection'>
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
            </section>
        </>
    )
}

export default Game