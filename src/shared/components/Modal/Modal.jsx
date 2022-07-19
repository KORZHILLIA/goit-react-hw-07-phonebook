import { createPortal } from 'react-dom';
import styles from './modal.module.css';

const backdrop = document.querySelector('#modal-root');

const Modal = ({ children }) => {
  return createPortal(
    <div className={styles.backdrop}>
      <div className={styles.modalBox}>{children}</div>
    </div>,
    backdrop
  );
};

export default Modal;
