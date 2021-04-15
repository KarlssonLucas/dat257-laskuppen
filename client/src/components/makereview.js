import '../css/makereview.css';
import SearchBar from './SearchBar'
import { useFormHook } from './useFormHook';

const MakeReviewComponent = () => {

    const [values,handleChange] = useFormHook({
        title: null,
        grade: null,
        recommended: null,
        author: null,
        pages: null,
        review: null
    });

    function submitForm(){

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        };

        fetch("/api/submitreview",requestOptions).then(response => response.json()).then(response => {
            console.log("FROM BACKEND: " , response);      
        })
    }

        


    return (

        <div className="content">
            <div className="header"> <h2 style={{ color: 'white' }}> Skriv Recensioner </h2> </div>
            <div className="grid-container">

                <div className="A">
                    <SearchBar />
                </div>

                <div className="B">
                    <div className="score">
                        <p> Betyg </p>
                        <input name="grade" type='number' value={values.grade} onChange={handleChange} max={10} min={0} />
                    </div>
                    <div className="likeable">
                        <p> Läsvärd </p>
                        <input name="recommended" type='radio' value={true} onChange={handleChange} />Ja--
                        <input name="recommended" type='radio' value={false} onChange={handleChange} />Nej
                        </div>
                </div>
                <div className="C">
                    <div className="title">
                        <p> Titel </p>
                        <input name="title" type='text' value={values.title} onChange={handleChange}/>
                    </div>
                    <div className="author">
                        <p> Författare </p>
                        <input name="author" type='text' value={values.author} onChange={handleChange}/>
                    </div>
                    <div className="pages">
                        <p> Sidor </p>
                        <input name="pages" type='number' value={values.pages} onChange={handleChange}/>
                    </div>
                    <div className="pic">
                        <img src="https://pbs.twimg.com/profile_images/1181583065811996673/ylZLdBGL_400x400.jpg" height={100} width={100} />

                    </div>
                </div>
                <div className="D">
                    <p> Recension </p>
                    <textarea name="review" type='text' value={values.review} onChange={handleChange} rows={10} cols={100} />

                </div>
                <div className="E">
                    <button className="btn btn-success" onClick={submitForm}>Skicka
                        </button>
                </div>
            </div>
        </div>
    )
}


export default MakeReviewComponent;

