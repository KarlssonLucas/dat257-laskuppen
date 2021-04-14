import React, { Component } from 'react'
import '../css/makereview.css';

export default class makereview extends Component {



    render() {
        return (
            <div className = 'rdiv'>
                
                <form> 
                    <p> Författare </p>
                    <input type = 'text' />

                    <p> Sidor </p>
                    <input type = 'number' />

                    <p> Betyg </p>
                    <input type = 'number' max={10} min={0} />
                    
                    <p> Recension </p>
                    <textarea rows = {10} cols = {70}/>
                   


                </form>
            </div>
        )
    }
}

