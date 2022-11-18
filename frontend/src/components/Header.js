import { useState, useEffect } from 'react';
import logo from '../images/logo.svg';
import buttonClose from '../images/buttonClose.svg';
import buttonBurger from '../images/buttonBurger.svg';
import { Route, Link } from 'react-router-dom';

function Header({ email, signOut, loggedIn, headerStatus, showHeaderMenu }) {
  const [headerIcon, setHeaderIcon] = useState('');

  useEffect(() => {
     setHeaderIcon(headerStatus ? buttonClose : buttonBurger);
  }, [headerStatus]);

  function changeHeaderMenu() {
    showHeaderMenu();
  }

  return (
    <header className={`header ${loggedIn ? 'header__auth' : ''}`}>
      <div className={`${loggedIn ? 'header__logo-container' : ''}`}>
        <img className={'header__logo'} src={logo} alt="Россия" />
        {loggedIn ? <img className={'header__icon'} src={headerIcon} onClick={changeHeaderMenu} /> : ''}
      </div>
      <div className={`header__menu ${loggedIn ? 'header__menu_auth' : ''} ${headerStatus ? 'header__menu_visible' : ''}`}>
        {loggedIn ? <p className={'header__email header__button_auth'}>{email||''}</p> : ''}
        <Route exact path="/">
          <button className={'header__button header__button_auth header__button_gray'} onClick={signOut}>Выйти</button>
        </Route>
        <Route path="/sign-up">
          <Link className={`header__button`} to="sign-in">Войти</Link>
        </Route>
        <Route path="/sign-in">
          <Link className={`header__button`} to="sign-up">Регистрация</Link>
        </Route>
      </div>
    </header>
  );
}

export default Header;

