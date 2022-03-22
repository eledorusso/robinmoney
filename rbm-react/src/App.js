import logo from './logo.svg';
import './styles/App.css';
import logoAndSlogan from './Assets/img/logoAndSlogan.svg';
import googleButton from './Assets/img/googleButton.svg';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import MainPage from './pages/MainPage';

function App() {
  return (
    /*<div className="App">
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
          Learn React
        </a>
      </header>
    </div>*/
    
      <BrowserRouter>
      <Routes>
      <Route path='/' element={    
        <>  
        <img src={logoAndSlogan} className="logoAndSlogan" />
        <div className="greenRectangle">
          <div className="iniciarSesion">INICIAR SESIÓN</div>
          <input type="image" src={googleButton} className="googleButton" />
          <p className="terminosCondiciones">
            Al <strong>Iniciar Sesión</strong>, aceptas nuestros
            <br />
            <strong>
            <a href="" style={{ textDecoration: "none" }} target="_blank">
              Términos y Condiciones
            </a>
            </strong>
            .
          </p>

        </div>
        </>   } />
        <Route path="/MainPage" element={<MainPage />}/>
        </Routes>
        </BrowserRouter>
    
  );
}

export default App;

/*
         <Router>
            <Routes>
            <Route exact path="/">
                <App />
              </Route>
              <Route exact path="/mainPage">
                <MainPage />
              </Route>
            </Routes>
          </Router> 


import React from "react";
import ReactDOM from 'react-dom';

class MainPage extends React.Component {
  render() {
  return(
<>
  <img src="img/logo+slogan.svg" className="logo" />
  <div className="greenRectangle">
    <div className="iniciarSesion">INICIAR SESIÓN</div>
    <input type="image" src="img/googleButton.svg" className="googleButton" />
    <p className="terminosCondiciones">
      Al <strong>Iniciar Sesión</strong>, aceptas nuestros
      <br />
      <strong>
        <a
          href="pages/terminosCondiciones.html"
          style={{ textDecoration: "none" }}
          target="_blank"
        >
          Términos y Condiciones
        </a>
      </strong>
      .
    </p>
  </div>
</>
  );
  }
}

ReactDOM.render(<MainPage />, document.getElementById('app'))*/
//export default MainPage;