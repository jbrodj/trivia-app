const Header = props => {
    // console.log(props)

    return (
        <header>
            <h1>Trivia Game</h1>
            <div className="userInfo">
                <h4>Logged in as: </h4>
                <button onClick={props.logout}>Sign out</button>
                {props.user?.email}
            </div>
        </header>
        
        )
}

export default Header;