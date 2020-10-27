import React, { Component } from 'react';
import { connect } from 'react-redux';

import PersonForm from '../person-form/person-form';
import { StoreState } from '../../reducers';

import { 
  instaHideToast,
  clearHideToastTimeout,
  clearDefaultResStatusTimeout,
  updatePerson,
  closeUpdatePersonModal 
} from '../../actions';
import { Person } from '../../types';

import './update-person-modal.scss';

interface UpdatePersonModalProps {
  active: boolean,
  selectedPerson: any
  instaHideToast: typeof instaHideToast,
  updatePerson(formValues: {}, id: number): Promise<void>,
  closeUpdatePersonModal: typeof closeUpdatePersonModal,
}

class UpdatePersonModal extends Component<UpdatePersonModalProps> {
  onSubmit = (formValues: {}) => {
    const { selectedPerson } = this.props;

    this.props.instaHideToast();

    clearHideToastTimeout();
    clearDefaultResStatusTimeout();

    this.props.updatePerson(formValues, selectedPerson.id);

    this.props.closeUpdatePersonModal();
  };

  render() {   
    const { active } = this.props;

    return (
      <div className={`modal update-modal ${active ? 'modal-active' : ''}`} id="updateEmployeeModal">
        <PersonForm 
          title={'Редактирование сотрудника'}
          onSubmit={this.onSubmit}
          closeModal={this.props.closeUpdatePersonModal}
        />  
      </div>  
    );
  }
}

const mapStateToProps = (state: StoreState): { active: boolean, selectedPerson: Person | undefined } => {
  return {
    active: state.modal.updatePersonModalActive,
    selectedPerson: state.staff.find((el: Person) => el.id === state.selectedPersonId)
  }
};

export default connect(mapStateToProps, { 
  instaHideToast,
  updatePerson,
  closeUpdatePersonModal 
})(UpdatePersonModal);