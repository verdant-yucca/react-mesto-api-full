import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext, useEffect } from 'react';
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, cards, onConfirm, headerStatus, showHeaderMenu }) {
  const currentUser = useContext(CurrentUserContext);
  const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };
  useEffect(() => { headerStatus && showHeaderMenu() }, []);

  return (
    <>
      <section className="profile">
        <div className="profile__avatar"  style={imageStyle}  onClick={onEditAvatar}></div>
        <div>
          <div className="profile__info-block">
            <h1 className="profile__profile-name">{currentUser.name}</h1>
            <button type="button" className="profile__button-edit" onClick={onEditProfile}></button>
          </div>
          <p className="profile__profile-info">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__button-add" onClick={onAddPlace}></button>
      </section>

      <section>
        <ul className="elements">
          {cards.map(card => (
            <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onConfirm={onConfirm} />
          ))}
        </ul>
      </section>
    </>
  );
}

export default Main;
