import axios from 'axios';
import { Dispatch } from 'redux';

import { Person, PersonForm } from '../types';

const baseUrl = 'http://localhost:3000';


export interface FetchStaffTableAction {
  type: 'FETCH_STAFF_TABLE',
  payload: Person[]
}

export interface SetStaffTableErrorMessageAction {
  type: 'SET_STAFF_TABLE_ERROR_MESSAGE', 
  payload: 'Ошибка при получении данных'
}

export const fetchStaffTable = () => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await axios.get(`${baseUrl}/persons`);
    
      dispatch<FetchStaffTableAction>({ type: 'FETCH_STAFF_TABLE', payload: res.data });
    } catch {
      dispatch({ type: 'SET_STAFF_TABLE_ERROR_MESSAGE', payload: 'Ошибка при получении данных' });
    }
  }; 
};


export const postPerson = (person: PersonForm) => {
  return async (dispatch: Function) => {
    try {
      const res = await axios.post(`${baseUrl}/persons`, person);

      dispatch(setResStatus(res.status as number));

      dispatch(showAndHideToast());

      dispatch(defaultResStatus());
      
      dispatch(fetchStaffTable());
    } catch {
      dispatch(showAndHideToast());
    }
  };
};

export const updatePerson = (person: PersonForm, id: number) => {
  return async (dispatch: Function) => {
    try {
      const res = await axios.put(`${baseUrl}/persons/${id}`, person);
      
      dispatch(setResStatus(res.status as number));

      dispatch(showAndHideToast());

      dispatch(defaultResStatus());

      dispatch(fetchStaffTable());
    } catch {
      dispatch(showAndHideToast());
    }
  };
};

export const deletePerson = (id: number) => {
  return async (dispatch: Function) => {
    try {
      const res = await axios.delete(`${baseUrl}/persons/${id}`);
      
      dispatch(setResStatus(res.status as number));

      dispatch(showAndHideToast());

      dispatch(defaultResStatus());
      
      dispatch(fetchStaffTable());
    } catch {
      dispatch(showAndHideToast());
    }
  };
};


export type ResStatusAction = SetResStatusAction | DefaultResStatusAction;


export interface SetResStatusAction {
  type: 'SET_RES_STATUS',
  payload: number
}

export const setResStatus = (status: number) => {
  return {
    type: 'SET_RES_STATUS',
    payload: status
  };
};


export interface DefaultResStatusAction {
  type: 'DEFAULT_RES_STATUS'
}

let defaultResStatusTimeout: any;

export const defaultResStatus = () => {
  return (dispatch: Dispatch) => {
    defaultResStatusTimeout = setTimeout(() => {
      dispatch({ type: 'DEFAULT_RES_STATUS' });
    }, 5500);
  };
};

export const clearDefaultResStatusTimeout = () => {
  clearTimeout(defaultResStatusTimeout);
};


export interface SetSelectedPersonAction {
  type: 'SET_SELECTED_PERSON',
  payload: number
}

export const setSelectedPerson = (id: number) => {
  return {
    type: 'SET_SELECTED_PERSON',
    payload: id
  };
};


export type ModalAction = 
  OpenCreatePersonModalAction | 
  CloseCreatePersonModalAction | 
  OpenUpdatePersonModalAction | 
  CloseUpdatePersonModalAction | 
  OpenDeletePersonModalAction |
  CloseDeletePersonModalAction;

interface OpenCreatePersonModalAction {
  type: 'OPEN_CREATE_PERSON_MODAL'
}

export const openCreatePersonModal = () => {
  return { type: 'OPEN_CREATE_PERSON_MODAL' };
};

interface CloseCreatePersonModalAction {
  type: 'CLOSE_CREATE_PERSON_MODAL'
}

export const closeCreatePersonModal = () => {
  return { type: 'CLOSE_CREATE_PERSON_MODAL' };
};

interface OpenUpdatePersonModalAction {
  type: 'OPEN_UPDATE_PERSON_MODAL'
}

export const openUpdatePersonModal = () => {
  return { type: 'OPEN_UPDATE_PERSON_MODAL' };
};

interface CloseUpdatePersonModalAction {
  type: 'CLOSE_UPDATE_PERSON_MODAL'
}

export const closeUpdatePersonModal = () => {
  return { type: 'CLOSE_UPDATE_PERSON_MODAL' };
};

interface OpenDeletePersonModalAction {
  type: 'OPEN_DELETE_PERSON_MODAL'
}

export const openDeletePersonModal = () => {
  return { type: 'OPEN_DELETE_PERSON_MODAL' };
};

interface CloseDeletePersonModalAction {
  type: 'CLOSE_DELETE_PERSON_MODAL'
}

export const closeDeletePersonModal = () => {
  return { type: 'CLOSE_DELETE_PERSON_MODAL' };
};


export interface ShowToastAction {
  type: 'SHOW_TOAST'
}

export const showToast = () => {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch<ShowToastAction>({ type: 'SHOW_TOAST' }); 
    }, 500);
  };
};


export interface hideToastAction {
  type: 'HIDE_TOAST'
}

let hideToastTimeout: any;

export const hideToast = () => {
  return (dispatch: Dispatch) => {
    hideToastTimeout = setTimeout(() => {
    dispatch({ type: 'HIDE_TOAST' });  
    }, 5500);
  };
};

export const clearHideToastTimeout = () => {
  clearTimeout(hideToastTimeout);
};


export const instaHideToast = () => {
  return { type: 'HIDE_TOAST' };
};


export const showAndHideToast = () => {
  return (dispatch: Function) => {
    dispatch(showToast());

    dispatch(hideToast());
  };
};