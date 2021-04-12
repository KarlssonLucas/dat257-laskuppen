import logo from './logo.svg';
import './App.css';

function api(){
  fetch('/api/users')
            .then(response => response.json())
            .then(res => {
                console.log(res);
            });
}

function App() {
  api();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React for laskuppen
        </a>
      </header>
    </div>
  );
}

export default App;
