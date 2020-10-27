import React from 'react';

import StaffTable from '../staff-table/staff-table';
import CreatePersonModal from '../create-person-modal/create-person-modal';
import UpdatePersonModal from '../update-person-modal/update-person-modal';
import DeletePersonModal from '../delete-person-modal/delete-person-modal';
import Toast from '../toast/toast';

import './app.scss';

const App = () => {
  return (
    <div className="app">
      <StaffTable />

      <CreatePersonModal />

      <UpdatePersonModal />

      <DeletePersonModal />

      <Toast />
    </div>
  );
};

export default App;