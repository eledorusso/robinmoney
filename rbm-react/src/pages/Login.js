import '../styles/Login.css';
import logoAndSlogan from '../Assets/img/logoAndSlogan.svg';
import googleButton from '../Assets/img/googleButton.svg';
import { Link } from 'react-router-dom';

function Login() {
    return (
<>
<img src={logoAndSlogan} className="logoAndSlogan" />
<div className="greenRectangle">
  <div className="iniciarSesion">INICIAR SESIÓN</div>
  <Link to="/MainPage"><input type="image" src={googleButton} className="googleButton"/></Link>
  <div className="terminosCondiciones">
    Al <div className="medium">Iniciar Sesión</div>, aceptas nuestros
    <br />
    <a href="" style={{ textDecoration: "none" }} target="_blank" className="medium">
      Términos y Condiciones
    </a>
    .
  </div>
</div>
</>
    );
}

export default Login;