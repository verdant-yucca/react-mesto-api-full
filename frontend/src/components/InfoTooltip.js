function InfoTooltip({ isOpen, onPopupClose, messageTooltip, iconTooltip }) {

  return (
    <div className={`popup ${isOpen ? 'popup_active': ''}`}>
      <div className="popup__container">
        <img className="popup__icon-tooltip" src={iconTooltip} />
        <h3 className="popup__title popup__title_type_tooltip">{messageTooltip}</h3>
        <button type="button" className="popup__button-close" onClick={onPopupClose} />
      </div>
    </div>
  );
}

export default InfoTooltip;
