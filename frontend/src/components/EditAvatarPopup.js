import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onPopupClose, onUpdateAvatar, isLoading }) {
  const inputRef = useRef(null);
  const handleSubmit = e => {
    e.preventDefault();
    onUpdateAvatar(inputRef.current.value);
    inputRef.current.value='';
  };

  return (
    <PopupWithForm title="Обновить аватар" name="form-edit-avatar" buttonSave="Сохранить" isOpen={isOpen}
                   onPopupClose={onPopupClose} onSubmit={handleSubmit} isLoading={isLoading} >
      <input ref={inputRef} type="url" name="url" id="url-avatar-input" className="popup__input popup__input_profile_info"
             placeholder="Ссылка на картинку" required />
      <span className="popup__error link-avatar-input-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
