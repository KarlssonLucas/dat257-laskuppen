import React, { useEffect, useState } from "react";
import "./css/loginpage.css";
import mypic from "./5836.svg";

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
        <p>Email</p>
        <input name="email" type="text" />
        <p>Lösenord</p>
        <input name="password" type="password"/>
        <p></p>
        <button type="button" class="btn btn-primary button-gradient">Logga in</button> 
      </div>
      <div className="login-page-loginart">
      <img src={mypic} alt="cool bild" height="100%" width="100%"/>
    
      </div>
      
    </div>
  );
};

export default LoginPage;
