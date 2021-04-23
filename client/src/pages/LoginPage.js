import fetch from "node-fetch";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import "./css/loginpage.css";
import mypic from "./EPIC.png";


const useLoginHook = (formValues) => {
  const [values, handleChange] = useState(formValues);

  return [values, e => {
    handleChange({
      ...values,
      [e.target.name]: e.target.value
    });
  }];
};

const LoginPage = (props) => {

  const [loggedIn, setLoggedIn] = useState(false);

  const [credentials, setCredentials] = useLoginHook({
    mail: "teacher@gmail.com",
    password: null
  });


  useEffect(() => {
    if (props.logout === true) {
      fetch("/api/logout").then(response => response.json()).then(response => {
        window.location.reload();
      })
    }
    else {
      fetch("/api/session").then(response => response.json()).then(response => {
        if (response.login === true) {
          setLoggedIn(true);
        }
      });
    }
  }, [])


  const login = () => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    };

    console.log("SEND", requestOptions.body)

    fetch("/api/login", requestOptions).then(response => response.json()).then(response => {
      if (response === true) {
        console.log("SUCCESS")
        window.location.reload();
      }
      else {
        console.log(response.error);
      }

    })


  }

  return (
    <div className="login-page-content">
      {(loggedIn) ? <Redirect to="/toplist" /> : <Redirect to="/login" />}
      <div className="login-page-header">
        <header>
          <div className="skewed-header"></div>
          <h1>Välkommen till läskuppen</h1>
        </header>
      </div>
      <div className="login-page-form">
        <div className="center-login">
          Email<br />
          <input value={credentials.mail} name="mail" type="text" onChange={setCredentials} />
          <br /><br />Lösenord (qwe123)<br />
          <input name="password" type="password" onChange={setCredentials} />
          <br /> <small className="resetPassword"><a href="google.se"> Återställ Lösenord </a></small>
          <br />
          <button type="button" onClick={() => { login() }} class="btn btn-primary button-gradient">Logga in</button>
        </div>
      </div>
      <div className="login-page-loginart">
        <img className="pic" src={mypic} alt="cool bild" height="100%" width="100%" />

      </div>

    </div>
  );
};

export default LoginPage;