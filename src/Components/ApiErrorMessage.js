
// Function to run if API call to category dropdown endpoint fails.
const ApiErrorMessage = () => {

        return (
            <div className="errorMessage">
                <p>We can't reach the trivia database right now. Please refresh the page to try again.</p>
                <button type="submit" onClick={() => window.location.reload(false)}>Try again</button>
            </div>
        )
}

export default ApiErrorMessage