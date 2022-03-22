import '../styles/MainPage.css';
import logoRBM from '../Assets/img/logoRBM.svg';
import logout from '../Assets/img/logout.svg';
import verPublicidad from '../Assets/img/verPublicidad.svg';
import imgPozo from '../Assets/img/imgPozo.svg';
import retirarDinero from '../Assets/img/retirarDinero.svg';

function MainPage() {
  return (
    <>
    <div className="header">
      <img src={logoRBM} className="mainLogo" />
      <input type="image" src={logout} className="logout" />
    </div>
    <input
      type="image"
      src={verPublicidad}
      className="verPublicidad"
    />
    <div className="tusFichas">TUS FICHAS</div>
    <div className="bordePozo">
      <img src={imgPozo} className="iconoPozo" />
      <div className="numeroPozo">100.000.000</div>
    </div>
    <input
      type="image"
      src={retirarDinero}
      className="retirarDinero"
    />
  </>
  );
}

export default MainPage;