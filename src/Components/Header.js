const Header = props => {
    // console.log(props)

    return (
        <header>
            <div className="wrapper">
                <h1>Trivia Game</h1>
                <div className="userInfo">
                    <h4>Logged in as: {props.user?.email}</h4>
                    
                    <button onClick={props.logout}>Sign out</button>
                </div>
            </div>
        </header>
        
        )
}

export default Header;