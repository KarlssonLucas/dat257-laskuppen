import React from 'react';
import Sidebar from './components/Sidebar';
import ContentTestComponent from './components/ContentTestComponent';
import { BrowserRouter, Route, Switch } from "react-router-dom";

export default class Laskuppen extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <div className="general-styling">
                    <div className="sidebar-container">
                        <Sidebar />
                    </div>
                    <div className="content-container">
                        <Switch>
                            <Route exact path="/toplist" render={(props) => <ContentTestComponent text="toplist" {...props} />}/>
                            <Route exact path="/reviews" render={(props) => <ContentTestComponent text="reviews" {...props} />}/>
                            <Route exact path="/makereview" render={(props) => <ContentTestComponent text="makereview" {...props} />}/>
                            <Route exact path="/books" render={(props) => <ContentTestComponent text="books" {...props} />}/>
                            <Route exact path="/faq" render={(props) => <ContentTestComponent text="faq" {...props} />}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>)
    };

}
