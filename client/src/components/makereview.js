import React, { Component } from 'react'
import '../css/makereview.css';
import SearchBar from './SearchBar'

export default class makereview extends Component {



    render() {
        return (
            <div className = 'rdiv'>

                <SearchBar/>
                
                <form> 
                    <p> Författare </p>
                    <input type = 'text' />

                    <p> Läsvärd </p>
                    <input type = 'radio' value = {true} name = "lasvard" />Ja--
                    <input type = 'radio' value = {false} name = "lasvard" />Nej

                    <p> Sidor </p>
                    <input type = 'number' />

                    <p> Betyg </p>
                    <input type = 'number' max={10} min={0} />
                    
                    <p> Recension </p>
                    <textarea rows = {10} cols = {70}/>

                </form>

                <img src = "https://pbs.twimg.com/profile_images/1181583065811996673/ylZLdBGL_400x400.jpg" height = {100} width={100} />

                
            </div>
        )
    }
}

