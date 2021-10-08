// = Libs =
import ReactDOM from 'react-dom';
import { Fragment } from 'react';

// = Styles =
import classes from './Modal.module.scss';

const Backdrop = props => {
  console.log(props);
  return <div className={classes.backdrop} onClick={props.onClick} />;
};

const ModalOverlay = props => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}> {props.children}</div>
    </div>
  );
};

const portalElement = document.querySelector('#overlay');

const Modal = props => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
