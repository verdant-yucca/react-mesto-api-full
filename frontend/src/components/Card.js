import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onConfirm }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__delete ${isOwn ? 'element__delete_active' : ''}`;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__button-like ${isLiked ? 'element__button-like_active' : ''}`;

  const handleCardClick = () => onCardClick(card);
  const handleConfirmClick = () => onConfirm(card);
  const handleLikeClick = () => onCardLike(card);

  return(
    <li className="element">
      <img className="element__image" src={card.link} alt={card.name} onClick={handleCardClick}/>
      <div className="element__description">
        <h2 className="element__element-info">{card.name}</h2>
        <div className="element__like-container">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
      <button type="button"  className={cardDeleteButtonClassName} onClick={handleConfirmClick}></button>
    </li>
  )
}

export default Card;
