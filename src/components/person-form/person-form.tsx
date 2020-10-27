import React, { Component } from 'react';
import {InjectedFormProps, Field, reduxForm } from 'redux-form';

import './person-form.scss';

interface PersonFormProps {
  title: string
  closeModal(): { type: string },
  onSubmit(formValues: {}): void,
}

class PersonForm extends Component<InjectedFormProps<{}, PersonFormProps> & PersonFormProps> {
  onDismissButtonClicked = () => {
    this.props.closeModal();

    this.props.reset();
  };

  onSubmit = (formValues: {}): void => {
    this.props.onSubmit(formValues);

    this.props.reset();
  };
  
  renderInput = (formProps: any): JSX.Element => {  
    return (
      <input 
        type="text" 
        required
        name={formProps.input.name} 
        placeholder={formProps.placeholder} 
        value={formProps.input.value}
        onChange={formProps.input.onChange} 
      />
    );
  };

  render() {
    const { title } = this.props;

    return (
        <div className="modal__content">
          <div className="modal__header">
            <h3 className="modal__title">{title}</h3>

            <button className="button-close" 
              onClick={() => this.onDismissButtonClicked()}
            >
              &times;
            </button>
          </div>
        
          <form 
            id="form" 
            className="modal__form" 
            onSubmit={this.props.handleSubmit(this.onSubmit)}
          >

            <Field 
              name="firstName" 
              placeholder="Введите имя сотрудника"  
              component={this.renderInput} 
            />

            <Field 
              name="lastName" 
              placeholder="Введите фамилию сотрудника"  
              component={this.renderInput} 
            />

            <div className="modal__buttons">
              <button className="button button-cancel" type="button"
                onClick={() => this.onDismissButtonClicked()}
              >
                Отмена
              </button>
              <button className="button button-save" type="submit">
                Сохранить
              </button>
            </div>
          </form>   
        </div>
    );
  }
}

export default reduxForm<{}, PersonFormProps>({
  form: 'personForm'
})(PersonForm);