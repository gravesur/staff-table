import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { Person } from '../types';
import { 
  FetchStaffTableAction,
  SetStaffTableErrorMessageAction,
  ResStatusAction,
  SetSelectedPersonAction,
  ModalAction,
  ShowToastAction,
  hideToastAction
} from '../actions';

export interface StoreState {
  staff: Person[],
  resStatus: number | null,
  selectedPersonId: number | null,
  staffTableErrorMessage: string,
  modal: {
    createPersonModalActive: boolean,
    updatePersonModalActive: boolean,
    deletePersonModalActive: boolean
  },
  toastActive: boolean,
  form: any
}

const staffReducer = (state: Person[] = [], action: FetchStaffTableAction) => {
  switch (action.type) {
    case 'FETCH_STAFF_TABLE':
      return action.payload;
    default:
      return state;
  }
};

const resStatusReducer = (state: number | null = null, action: ResStatusAction) => {
  switch (action.type) {
    case 'SET_RES_STATUS':
      return action.payload;
    case 'DEFAULT_RES_STATUS':
      return null;
    default:
      return state;
  }
};

const selectedPersonReducer = (state: number | null = null, action: SetSelectedPersonAction) => {
  switch (action.type) {
    case 'SET_SELECTED_PERSON':
      return action.payload;
    default:
      return state;
  }
}

const staffTableErrorMessageReducer = (state: string = '', action: SetStaffTableErrorMessageAction) => {
  switch (action.type) {
    case 'SET_STAFF_TABLE_ERROR_MESSAGE':
      return action.payload;
    default:
      return state;
  }
};


const INITIAL_MODAL_STATE = {
  createPersonModalActive: false,
  updatePersonModalActive: false,
  deletePersonModalActive: false
};

const modalReducer = (state = INITIAL_MODAL_STATE, action: ModalAction) => {
  switch (action.type) {
    case 'OPEN_CREATE_PERSON_MODAL':
      return { ...state, createPersonModalActive: true };
    case 'CLOSE_CREATE_PERSON_MODAL':
      return { ...state, createPersonModalActive: false };
  
    case 'OPEN_UPDATE_PERSON_MODAL':
      return { ...state, updatePersonModalActive: true };
    case 'CLOSE_UPDATE_PERSON_MODAL':
      return { ...state, updatePersonModalActive: false };

    case 'OPEN_DELETE_PERSON_MODAL':
      return { ...state, deletePersonModalActive: true };
    case 'CLOSE_DELETE_PERSON_MODAL':
      return { ...state, deletePersonModalActive: false };

    default:
      return state;
  }
};


const toastReducer = (state = false, action: ShowToastAction | hideToastAction) => {
  switch (action.type) {
    case 'SHOW_TOAST':
      return true;
    case 'HIDE_TOAST':
      return false;
    default:
      return state;
  }
};


export default combineReducers<StoreState>({
  staff: staffReducer,
  resStatus: resStatusReducer,
  selectedPersonId: selectedPersonReducer,
  staffTableErrorMessage: staffTableErrorMessageReducer,
  modal: modalReducer,
  toastActive: toastReducer,
  form: formReducer
});