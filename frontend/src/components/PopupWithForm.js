import React from 'react';

function PopupWithForm({isOpen, onPopupClose, name, title, buttonSave, isLoading, onSubmit, children}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_active': ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form name={`${name}`} className="popup__edit" noValidate onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__button-save" >{!isLoading ? buttonSave : 'Сохранение...'}</button>
        </form>
        <button type="button" className="popup__button-close" onClick={onPopupClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;


