import { useState } from "react";
import ApiErrorMessage from "./ApiErrorMessage";
import CategoryDropdown from "./CategoryDropdown";

const QueryForm = () => {

    const [apiResError, setApiResError] = useState(null)

    if (apiResError) {
        return <ApiErrorMessage />
    }

    if (apiResError === null) {

        return (
            <div>
                <form action="">
                    <label htmlFor="questionAmount"></label>
                    <select id="questionAmount">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                    <CategoryDropdown 
                        apiResError={apiResError}
                        setApiResError={setApiResError}
                    />
                    <label htmlFor="questionDifficulty"></label>
                    <select id="questionDifficulty">
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