import PropTypes from 'prop-types';
import styles from './ContactEl.module.css';
const ContactEl = ({
  id,
  name,
  phone,
  deleteClickHandler,
  openModalHandler,
}) => (
  <li className={styles.contactEl}>
    <span className={styles.contactText}>{name}: </span>
    <span className={styles.contactText}>{phone}</span>
    <button
      className={`btn ${styles.deleteBtn}`}
      type="button"
      onClick={() => deleteClickHandler(id)}
    >
      Delete
    </button>
    <button
      className="btn"
      type="button"
      onClick={() => openModalHandler({ id, name, phone })}
    >
      Edit
    </button>
  </li>
);

ContactEl.defaultProps = {
  deleteClickHandler: () => {},
};

ContactEl.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  deleteClickHandler: PropTypes.func.isRequired,
};
export default ContactEl;
