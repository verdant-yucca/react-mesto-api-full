import PopupWithForm from './PopupWithForm';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onPopupClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleChangeName = e => setName(e.target.value);
  const handleChangeAbout = e => setDescription(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description
    });
  };

  return (
    <PopupWithForm title="Редактировать профиль" name="form-edit-profile" buttonSave="Сохранить" isOpen={isOpen}
                   onPopupClose={onPopupClose} onSubmit={handleSubmit} isLoading={isLoading} >
      <input type="text" value={name||''} onChange={handleChangeName} name="name" id="name-profile-input"
             className="popup__input popup__input_profile_name" placeholder="Имя профиля" required minLength="2" maxLength="40" />
      <span className="popup__error name-profile-input-error"></span>
      <input type="text" value={description||''} onChange={handleChangeAbout} name="info" id="info-input"
             className="popup__input popup__input_profile_info" placeholder="Информация" required minLength="2" maxLength="200" />
      <span className="popup__error info-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
