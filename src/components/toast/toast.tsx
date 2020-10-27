import React from 'react';
import { connect } from 'react-redux';

import { StoreState } from '../../reducers';
import { 
  instaHideToast,
  clearHideToastTimeout,
  clearDefaultResStatusTimeout
} from '../../actions';

import './toast.scss';

interface ToastProps {
  resStatus: number | null,
  toastActive: boolean,
  instaHideToast: typeof instaHideToast
}

const Toast = (props: ToastProps): JSX.Element => {
  const { resStatus, toastActive } = props;

  const onCloseButtonClick = (): void => {
    props.instaHideToast();

    clearHideToastTimeout();
    clearDefaultResStatusTimeout();
  };

  return (
    <div 
      id="toast" 
      className={`toast ${toastActive ? 'toast--active' : ''} ${resStatus ? 'toast--success' : 'toast--error'}`}
    >   
      <div className="toast__header">  
        <button className="" onClick={onCloseButtonClick}>
          &times;
        </button>
      </div>   
      <div className="toast__body">
        {resStatus ? 'Успешно' : 'Ошибка'}
      </div>
    </div>    
  );
};

const mapStateToProps = ({ resStatus, toastActive }: StoreState) => {
  return {
    resStatus,
    toastActive
  };
};

export default connect(mapStateToProps, { instaHideToast })(Toast);