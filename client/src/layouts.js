import React from 'react'

const Layout = ({title = "Title", desc = "Hej",
className, children}) => {
    return (
        <div className = "Monke">
            <a href="/api/users"> To api </a>
            <button onClick={() => {window.location = "/api/users"}}> to api 2.0</button>
            <h2> {title} </h2>
            <p> {desc} </p>
        </div>
    )
}



export default Layout;