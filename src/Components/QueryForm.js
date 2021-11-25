import axios from "axios";
import { useState } from "react";
import ApiErrorMessage from "./ApiErrorMessage";
import CategoryDropdown from "./CategoryDropdown";

const QueryForm = props => {

    const { questionArray, setQuestionArray, gameQuestions, setGameQuestions } = props

    // State holding initial API call status for error handling - null will make app run normally.
    const [apiResError, setApiResError] = useState(null)

    // State for holding user inputs. 
    const [ questionAmount, setQuestionAmount ] = useState('')

    const [ questionCategory, setQuestionCategory ] = useState('')

    const [ questionDifficulty, setQuestionDifficulty ] = useState('')

    // Event handling for user inputs
    const handleAmountChange = event => {
        setQuestionAmount(event.target.value);
    }

    const handleCategoryChange = event => {
        setQuestionCategory(event.target.value)
    }

    const handleDifficultyChange = event => {
        setQuestionDifficulty(event.target.value)
    }

    // Form submission
    const handleSubmit = event => {
        event.preventDefault()

        // Set baseline parameters for the axios params object
        const params = {
            amount: questionAmount,
            category: questionCategory,
            difficulty: questionDifficulty
        }

        // Function to selectively delete key/value pairs from the axios params object if the user leaves any non-required fields empty.
        const deleteParams = () => {
            if (questionCategory === '') {
                delete params.category
            }
            if (questionDifficulty === '') {
                delete params.difficulty
            }
        }

        deleteParams()

        axios({
            url: "https://opentdb.com/api.php",
            method: "GET",
            dataResponse: "JSON",
            params: params
        }).then((response) => {
            // if (response.status > 200 && response.status < 299) {
            //     console.log('no good')
            // }
            setQuestionArray(response.data.results)
            setGameQuestions(questionArray)
            // Reset user input state to default after query submit
            setQuestionAmount(null);
            setQuestionCategory(null);
            setQuestionDifficulty(null);

            // console.log(response.data.results)

        })

        // return () => {
        //     console.log('end api call')
        // }
    }
    
    
    if (apiResError) {
        return <ApiErrorMessage />
    }

    if (apiResError === null) {

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="questionAmount"></label>
                    <select 
                        required
                        id="questionAmount"
                        onChange={handleAmountChange}
                    >
                        <option value=''>Select number of questions</option>        
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                    </select>
                    <CategoryDropdown 
                        apiResError={apiResError}
                        setApiResError={setApiResError}
                        questionCategory={questionCategory}
                        setQuestionCategory={setQuestionCategory}
                        handleCategoryChange={handleCategoryChange}
                    />
                    <label htmlFor="questionDifficulty"></label>
                    <select 
                        id="questionDifficulty"
                        onChange={handleDifficultyChange}
                    >
                        <option value="">Any difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default QueryForm;