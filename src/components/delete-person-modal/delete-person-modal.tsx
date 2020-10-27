import React from 'react';
import { connect } from 'react-redux';

import { 
  closeDeletePersonModal, 
  instaHideToast,
  clearHideToastTimeout,
  clearDefaultResStatusTimeout,
  deletePerson 
} from '../../actions';
import { Person } from '../../types';
import { StoreState } from '../../reducers';

import './delete-person-modal.scss';

interface DeletePersonModalProps {
  selectedPerson: any, 
  active: boolean, 
  closeDeletePersonModal: typeof closeDeletePersonModal, 
  instaHideToast: typeof instaHideToast, 
  deletePerson(id: number): Promise<void>
};

const DeletePersonModal = (props: DeletePersonModalProps): JSX.Element => {
  const { selectedPerson, active, closeDeletePersonModal, instaHideToast, deletePerson } = props;

  const onDeleteButtonClicked = (id: number) => {
    instaHideToast();

    clearHideToastTimeout();
    clearDefaultResStatusTimeout();

    deletePerson(id);

    closeDeletePersonModal();
  };

  return (
    <div className={`modal delete-modal ${active ? 'modal-active' : ''}`} id="deleteEmployeeModal">
      <div className="modal__content">
        <div className="modal__header">
          <h3 className="delete-modal__title">Удаление сотрудника</h3>

          <button className="button-close"
           onClick={() => closeDeletePersonModal()} 
          >
            &times;
          </button>
        </div>

        <div className="modal__body">
          <p>Вы действительно хотите удалить сотрудника?</p>
          
          <div className="modal__buttons">
            <button 
              type="button"
              className="button button-cancel" 
              onClick={() => closeDeletePersonModal()}
            >
              Отмена
            </button>

            <button 
              id="btnDelete" 
              className="button button-save" 
              type="button"
              onClick={() => onDeleteButtonClicked(selectedPerson.id)}
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: StoreState): { active: boolean, selectedPerson: Person | undefined } => {
  return {
    active: state.modal.deletePersonModalActive,
    selectedPerson: state.staff.find((el: Person) => el.id === state.selectedPersonId)
  }
};

export default connect(mapStateToProps, { 
  closeDeletePersonModal,
  instaHideToast,
  deletePerson,
})(DeletePersonModal);