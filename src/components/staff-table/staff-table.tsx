import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
  fetchStaffTable, 
  setResStatus, 
  setSelectedPerson, 
  openCreatePersonModal, 
  openUpdatePersonModal,
  openDeletePersonModal,
} from '../../actions';
import { Person } from '../../types';
import { StoreState } from '../../reducers';

import './staff-table.scss';


interface StaffTableProps {
  staff: Person[],
  staffTableErrorMessage: string 
  fetchStaffTable(): Promise<void>, 
  setResStatus: typeof setResStatus, 
  setSelectedPerson: typeof setSelectedPerson, 
  openCreatePersonModal: typeof openCreatePersonModal, 
  openUpdatePersonModal: typeof openUpdatePersonModal,
  openDeletePersonModal: typeof openDeletePersonModal
}

class StaffTable extends Component<StaffTableProps> {
  componentDidMount() {
    this.props.fetchStaffTable();
  }

  onAddButtonClicked = (): void => {
    this.props.openCreatePersonModal();
  };

  onUpdateButtonClicked = (id: number): void => {
    this.props.setSelectedPerson(id);
    
    this.props.openUpdatePersonModal();
  };

  onDeleteButtonClicked = (id: number): void => {
    this.props.openDeletePersonModal();

    this.props.setSelectedPerson(id);
  };

  render() {
    const { staff, staffTableErrorMessage } = this.props;

    const renderedTableItems = staff.map((el: Person) => {
      return (
        <tr key={el.id}>
          <td>
            <svg width="1.6rem" height="1.6rem" viewBox="0 0 16 16" className="icon-person bi bi-person" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path 
                fillRule="evenodd" 
                d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
              />
            </svg>
          </td>
          <td>{el.firstName}</td>
          <td>{el.lastName}</td>
          <td>
            <div className="staff-table__buttons">
              <button className="button button-update"
                data-toggle="modal" 
                data-target="#updateEmployeeModal"
                onClick={() => this.onUpdateButtonClicked(el.id)}
              >
                <svg width="1rem" height="1rem" viewBox="0 0 16 16" className="icon icon-pencil bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    fillRule="evenodd" 
                    d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"
                  />
                  <path 
                    fillRule="evenodd" 
                    d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"
                  />
                </svg>
              </button>
              
              <button className="button button-delete"
                data-toggle="modal" 
                data-target="#deleteEmployeeModal"
                onClick={() => this.onDeleteButtonClicked(el.id)}
              >
                <svg width="1rem" height="1rem" viewBox="0 0 16 16" className="icon icon-x bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                  <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
                </svg>
              </button>
            </div>
          </td>
        </tr>
      );
    });

    if (staffTableErrorMessage) {
      return (
        <div className="">
          <h1 className="">{staffTableErrorMessage}</h1>
        </div>
      );
    }
    
    return (
      <React.Fragment>
        <table className="staff-table">
          <thead>
            <tr>
              <th></th>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {staff.length ? renderedTableItems : null}   
          </tbody>      
        </table> 

        <button className="button button-add"          
          onClick={() => this.onAddButtonClicked()}>
          Добавить сотрудника
        </button>
      </React.Fragment>   
    );
  }
}

const mapStateToProps = ({ staff, staffTableErrorMessage }: StoreState) => {
  return { 
    staff,
    staffTableErrorMessage
  };
};

export default connect(mapStateToProps, { 
    fetchStaffTable, 
    setResStatus, 
    setSelectedPerson,
    openCreatePersonModal, 
    openUpdatePersonModal,
    openDeletePersonModal,
  })(StaffTable);