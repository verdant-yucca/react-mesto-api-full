import PopupWithForm from './PopupWithForm';
import { useState } from 'react';

function AddPlacePopup({ isOpen, onPopupClose, onAddPlace, isLoading }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const handleChangeTitle = e => setTitle(e.target.value);
  const handleChangeUrl = e => setUrl(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    onAddPlace(title, url);
    setTitle('');
    setUrl('');
  };

  return (
    <PopupWithForm title="Новое место" name="form-add-cards" buttonSave="Создать" isOpen={isOpen}
                   onPopupClose={onPopupClose} onSubmit={handleSubmit} isLoading={isLoading} >
      <input type="text" value={title} onChange={handleChangeTitle} name="name" id="name-mesto-input"
             className="popup__input popup__input_profile_name" placeholder="Название" required minLength="2" maxLength="30" />
      <span className="popup__error name-mesto-input-error"></span>
      <input type="url" value={url} onChange={handleChangeUrl} name="info" id="link-input"
             className="popup__input popup__input_profile_info" placeholder="Ссылка на картинку" required />
      <span className="popup__error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
