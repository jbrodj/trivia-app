const Header = props => {
    // console.log(props)

    return (
        <header>
            <div className="wrapper">
                <h1>Trivia Game</h1>
                <div className="userInfo">
                    <p>Logged in as: {props.user?.email}</p>
                    <button onClick={props.logout}>Sign out</button>
                </div>
            </div>
        </header>
        
        )
}

export default Header;