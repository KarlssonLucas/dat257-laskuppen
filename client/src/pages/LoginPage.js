import React, { useEffect, useState } from "react";
import "./css/loginpage.css";
import mypic from "./EPIC.png";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({

    email: null,
    password: null

  });


  return (
    <div className="login-page-content">
      <div className="login-page-header">
        <header>
          <div className="skewed-header"></div>
          <h1>Välkommen till läskuppen</h1>
        </header>
      </div>
      <div className="login-page-form">
        <div className="center-login">
        Email<br/>
        <input name="email" type="text" />
        <br/><br/>Lösenord<br/>
        <input name="password" type="password"/>
        <br/> <small className="resetPassword"><a href="google.se"> Återställ Lösenord </a></small>
        <br/>
        <button type="button" class="btn btn-primary button-gradient">Logga in</button> 
        </div>
      </div>
      <div className="login-page-loginart">
      <img className="pic" src={mypic} alt="cool bild" height="100%" width="100%"/>

      </div>
      
    </div>
  );
};

export default LoginPage;
