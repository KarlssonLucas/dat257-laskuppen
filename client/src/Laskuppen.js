import React from 'react';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ToplistPage from './pages/ToplistPage';
import MakeReviewPage from './pages/MakeReviewPage';
import BooksPage from './pages/BooksPage';
import FAQPage from './pages/FAQPage';
import './main.css';
import './css/laskuppen.css';

export default class Laskuppen extends React.Component {

    constructor(props) {
        super();
    }
  
    render() {
        return (
            <BrowserRouter>
                <div className="general-styling">
                    <div className="sidebar-container">
                        <Sidebar />
                    </div>
                    <div className="content-container">
                        <Switch>
                            <Route exact path="/toplist" render={(props) => <ToplistPage  {...props} />}/>
                            <Route exact path="/makereview" render={(props) => <MakeReviewPage  {...props} />}/>
                            <Route exact path="/books" render={(props) => <BooksPage {...props} />}/>
                            <Route exact path="/faq" render={(props) => <FAQPage  {...props} />}/>
                     </Switch>
                    </div>
                </div>
            </BrowserRouter>)
    };

}
