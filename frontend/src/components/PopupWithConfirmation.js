import PopupWithForm from './PopupWithForm';

function PopupWithConfirmation({ isOpen, onPopupClose, card, onCardDelete }) {
  const handleSubmit = e => {
    e.preventDefault();
    onCardDelete(card);
  };

  return (
    <PopupWithForm title="Вы уверены?" name="form-confirm" buttonSave="Да"
                   isOpen={isOpen} onPopupClose={onPopupClose} onSubmit={handleSubmit} />
  );
}
export default PopupWithConfirmation;
