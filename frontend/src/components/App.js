import {useState, useEffect} from 'react';
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import api from '../utils/api';
import * as mestoAuth from '../utils/mestoAuth.js';
import Register from './Register';
import Login from './Login';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup';
import PopupWithConfirmation from './PopupWithConfirmation'
import InfoTooltip from './InfoTooltip';
import successIcon from '../images/success.svg';
import failIcon from '../images/fail.svg';

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCardDelete, setSelectedCardDelete] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [messageTooltip, setMessageTooltip] = useState('');
  const [iconTooltip, setIconTooltip] = useState('');
  const [headerStatus, setHeaderStatus] = useState(false);

  const onError = err => console.log(`Ошибка: ${err}`);

  useEffect(() => {
    api.getAppInfo()
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch(err => onError(err));
    checkToken();
  }, [])

  const handleSuccessClick = () => setIsTooltipPopupOpen(true);

  const handleRegister = (password, email) => {
    mestoAuth.register(password, email)
      .then(res => {
        if(res) {
          setIconTooltip(successIcon);
          setMessageTooltip('Вы успешно зарегистрировались!');
          handleSuccessClick();
          history.push('/sign-in');
        }
      })
      .then(() => setTimeout(handleLogin, 300, password, email))
      .catch(err => {
        onError(err);
        setIconTooltip(failIcon);
        setMessageTooltip('Что-то пошло не так! Попробуйте еще раз.');
        handleSuccessClick();
      });
  };

  const handleLogin = (password, email) => {
    mestoAuth.login(password, email)
      .then(res => {
        if(res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          setEmail(email);
          history.push('/');
        }
      })
      .catch((err) => {
        onError(err);
        setIconTooltip(failIcon);
        setMessageTooltip('Что-то пошло не так! Попробуйте еще раз.');
        handleSuccessClick();
        history.push('/sign-in');
      });
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setEmail('');
    history.push('/sign-in');
  };

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleCardClick = card => setSelectedCard(card);

  const handleConfirmClick = card => {
    setIsConfirmPopupOpen(true);
    setSelectedCardDelete(card);
  };

  const handleCardLike = card => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => setCards((state) => state.map((c) => c._id === card._id ? newCard : c)))
      .catch(err => onError(err));
  };

  const handleCardDelete = card => {
    api.deleteCard(card._id)
      .then(() => setCards((state) => state.filter(item => item._id !== card._id)))
      .catch(err => onError(err))
      .finally(() => closeAllPopups());
  };

  const handleAddPlaceSubmit = (name, info) => {
    setIsLoading(true);
    api.addCard(name, info)
      .then(newCard => setCards([newCard, ...cards]))
      .catch(err => onError(err))
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  };

  const handleUpdateUser = data => {
    setIsLoading(true);
    api.editProfile(data)
      .then(result => setCurrentUser(result))
      .catch(err => onError(err))
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  };

  const handleUpdateAvatar = url => {
    setIsLoading(true);
    api.editAvatar(url)
      .then(result => setCurrentUser(result))
      .catch(err => onError(err))
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
    setSelectedCardDelete(null);
    setIsTooltipPopupOpen(false);
    setMessageTooltip('');
    setIconTooltip('');
  };

  function checkToken() {
    if (localStorage.getItem('token')) {
      //const jwt = localStorage.getItem('token');
      mestoAuth.check()
        .then((res) => {
          setEmail(res.data.email);
          setLoggedIn(true);
          history.push('/');
        })
        .catch(err => onError(err));
    }
  }

  const showHeaderMenu = () => setHeaderStatus(!headerStatus);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} signOut={signOut} loggedIn={loggedIn}
                headerStatus={headerStatus} showHeaderMenu={showHeaderMenu}/>

        <main className="content">
          <Switch>
            <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main} onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onConfirm={handleConfirmClick}
                            onCardClick={handleCardClick} onCardLike={handleCardLike} cards={cards} headerStatus={headerStatus}
                            showHeaderMenu={showHeaderMenu}/>
            <Route path="/sign-up">
              <Register handleRegister={handleRegister}/>
            </Route>
            <Route path="/sign-in">
              <Login handleLogin={handleLogin}/>
            </Route>
            <Route path="*">
              <Redirect to="/sign-in" />
            </Route>
          </Switch>
        </main>

        {loggedIn && <Footer />}

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onPopupClose={closeAllPopups}
                          onUpdateUser={handleUpdateUser} isLoading={isLoading}/>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onPopupClose={closeAllPopups}
                       onAddPlace={handleAddPlaceSubmit} isLoading={isLoading}/>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onPopupClose={closeAllPopups}
                         onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading}/>

        <PopupWithConfirmation isOpen={isConfirmPopupOpen} onPopupClose={closeAllPopups}
                               card={selectedCardDelete} onCardDelete={handleCardDelete}/>

        <ImagePopup card={selectedCard} onPopupClose={closeAllPopups}/>

        <InfoTooltip isOpen={isTooltipPopupOpen} onPopupClose={closeAllPopups}
                     messageTooltip={messageTooltip} iconTooltip={iconTooltip}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
