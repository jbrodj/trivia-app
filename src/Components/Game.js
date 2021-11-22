const Game = props => {

    const { questionArray, setQuestionArray } = props

    const newGameHandler = () => {
        setQuestionArray(null)
    }

    const questionCounter = 0

    return (
        <>
            <h2>Game hereeeee</h2>
            <button onClick={newGameHandler}>New game</button>
            <section className='questionSection'>
                {
                    questionArray.map((individualQuestion) => {
                        return (
                            <>
                                <li>
                                    <h3>
                                        {individualQuestion.question}
                                    </h3>
                                    <ul>
                                        <li>
                                            {individualQuestion.category}
                                        </li>
                                        <li>
                                            {individualQuestion.difficulty}
                                        </li>
                                    </ul>
                                    <ul className="answers">
                                        
                                    </ul>
                                </li>
                            </>
                        )
                    })
                }
            </section>
        </>
    )
}

export default Game