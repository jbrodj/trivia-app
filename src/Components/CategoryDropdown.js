import { useState, useEffect } from 'react';
import axios from 'axios'

// Dynamically populate category dropdown from API endpoint. 
const CategoryDropdown = props => {
    const { apiResError, setApiResError, handleCategoryChange} = props

    // State to hold the categories array
    const [categories, setCategories] = useState([]);

    // Call to the categories endpoing & set state
    useEffect(() => {
        axios({
            url: 'https://opentdb.com/api_category.php'
        }).then( (res) => {
            // If API call response status is between 200-299, run normally. If outside that range, throw error to skip dropdown render.
            if (res.status < 200 && res.status <299) {
                throw Error(`We can't reach the trivia database right now. Please refresh the page to try again.`)
            }
            setCategories(res.data.trivia_categories)
        })
        .catch(error => {
            setApiResError(error.message)
            console.log(error.message)
        })
        // Cancel useEffect subscription
    },[setApiResError]);

    // if (apiResError) {
    //     return (
    //         <div className="errorMessage">
    //             <p>We can't reach the trivia database right now. Please refresh the page to try again.</p>
    //         </div>
    //     )
    // }

    if (apiResError === null) {

    return (
        <>
            <label htmlFor="questionCategory" className="sr-only">Category</label>
            <select 
                name="question category" 
                id="questionCategory"
                onChange={handleCategoryChange}
            >
                <option value="">Any category</option>
                {/* Map the state array to the option elements */}
                {
                    categories.map( (individualCategory) => {
                        return (
                            <option
                                key={individualCategory.id}
                                value={individualCategory.id}
                            >
                                {individualCategory.name}
                            </option>
                        )
                    })
                }

            </select>
        </>
    )
            }
}

export default CategoryDropdown;