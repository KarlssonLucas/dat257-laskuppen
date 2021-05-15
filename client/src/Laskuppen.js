import React from 'react';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ToplistPage from './pages/ToplistPage';
import ReviewPage from './pages/ReviewPage';
import BooksPageDetails from './pages/BooksPageDetails';
import BooksPage from './pages/BooksPage';
import ProfilePage from './pages/ProfilePage';
import FAQPage from './pages/FAQPage';
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage';
import './css/main.css';
import TeacherPage from './pages/TeacherPage';

export default class Laskuppen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { loggedIn: false }
    }

        componentDidMount() {
        fetch("/api/session").then(response => response.json()).then(response => {
            if (response.login !== true) {
                console.log("NOT LOGGED IN")
            }
            else {
                console.log("LOGGED IN")
                this.setState({ loggedIn: true })
            }
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div className="main-general-styling">
                    
                    <Sidebar />
                   
                    <div className="main-page-container">
                        <Switch>
                        <Route exact path="/login" render={(props) => <LoginPage {...props} />} />
                        <Route exact path="/logout" render={(props) => <LoginPage logout={true} {...props} />} />
                            {(this.state.loggedIn) ?
                                <div className="page-holder">
                                    <Route exact path="/toplist" render={(props) => <ToplistPage {...props} />} />
                                    <Route exact path="/makereview" render={(props) => <ReviewPage  {...props} />} />
                                    <Route exact path="/books" render={(props) => <BooksPage {...props} />} />
                                    <Route exact path="/books/:id" render={(props) => <BooksPageDetails {...props} />} />
                                    <Route exact path="/profile" render={(props) => <ProfilePage {...props} />} />
                                    <Route exact path="/faq" render={(props) => <FAQPage {...props} />} />
                                    <Route exact path="/teacher" render={(props) => <TeacherPage {...props} />} />
                                    <Route exact path="/admin" render={(props) => <AdminPage {...props} />} />
                                </div>
                                : ""
                            }
                        </Switch>

                    </div>
                </div>
            </BrowserRouter>)
    };

}
