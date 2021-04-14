import React, { Component } from 'react'
import '../css/makereview.css';
import SearchBar from './SearchBar'

export default class makereview extends Component {




    render() {
        return (

            <div className = "grid-container">
            
                     <div className = "A">
                        <SearchBar/>
                    </div>

                    <div className="B">

                        <div className ="score">
                            <p> Betyg </p>
                            <input type = 'number' max={10} min={0} />
                        </div>

                        <div className ="likeable">
                            <p> Läsvärd </p>
                            <input type = 'radio' value = {true} name = "lasvard" />Ja--
                            <input type = 'radio' value = {false} name = "lasvard" />Nej
                        </div>

                    
                    </div>

                    <div className ="C">

                        <div className ="title">
                            <p> Titel </p>
                            <intut type = 'text' />
                        </div>

                        <div className ="author">
                            <p> Författare </p>
                            <input type = 'text' />
                        </div>

                        <div className ="pages">
                            <p> Sidor </p>
                            <input type = 'number' />
                        </div>

                        <div className ="pix">
                            <img src = "https://pbs.twimg.com/profile_images/1181583065811996673/ylZLdBGL_400x400.jpg" height = {100} width={100} />    

                        </div>
                    </div>
                    
                    <div className="D"> 
                        <p> Recension </p>
                            <textarea rows = {10} cols = {100}/>
                        
                    </div>

                    <div className="E">
                        <button className="btn btn-success" onClick={() => {console.log("submitted")}}>Skicka
                        </button>
                    </div>
            </div>
        )
    }
}

