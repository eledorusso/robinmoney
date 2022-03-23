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
</>
    );
}

export default Login;