import React, { Component } from 'react';
import { connect } from 'react-redux';

import PersonForm from '../person-form/person-form';
import { StoreState } from '../../reducers';
import { 
  postPerson,
  instaHideToast,
  clearHideToastTimeout,
  clearDefaultResStatusTimeout,
  closeCreatePersonModal 
} from '../../actions';

import './create-person-modal.scss';

interface CreatePersonModalProps {
  instaHideToast: typeof instaHideToast,
  postPerson(person: {}): Promise<void>,
  closeCreatePersonModal: typeof closeCreatePersonModal,
  active: boolean
}

class CreatePersonModal extends Component<CreatePersonModalProps> {
  onSubmit = (formValues: {}) => { 
    this.props.instaHideToast();

    clearHideToastTimeout();
    clearDefaultResStatusTimeout();

    this.props.postPerson(formValues);

    this.props.closeCreatePersonModal();
  };

  render() {
    const { active } = this.props;

    return (
      <div className={`modal create-modal ${active ? 'modal-active' : ''}`} id="createEmployeeModal">
        <PersonForm 
          title={'Создание сотрудника'}
          onSubmit={this.onSubmit}
          closeModal={this.props.closeCreatePersonModal} 
        />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState): { active: boolean } => {
  return {
    active: state.modal.createPersonModalActive
  };
};

export default connect(mapStateToProps, { 
  instaHideToast,
  postPerson,
  closeCreatePersonModal
})(CreatePersonModal);