import logo from './logo.svg';
import logoAndSlogan from './Assets/img/logoAndSlogan.svg';
import googleButton from './Assets/img/googleButton.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import { Link } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path="/MainPage" element={<MainPage/>}/>
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