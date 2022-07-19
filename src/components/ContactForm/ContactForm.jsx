import { memo } from 'react';
import PropTypes from 'prop-types';
import useContactForm from 'shared/services/hooks/useContactForm';
import styles from './ContactForm.module.css';

const ContactForm = ({ onSubmit }) => {
  const [state, inputChangeHandler, submitHandler] = useContactForm(
    {
      name: '',
      phone: '',
    },
    onSubmit
  );

  const { name, phone } = state;

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <label className={styles.label}>
        <input
          className={styles.input}
          onChange={inputChangeHandler}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        Name
      </label>
      <label className={styles.label}>
        <input
          className={styles.input}
          onChange={inputChangeHandler}
          type="tel"
          name="phone"
          value={phone}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        Number
      </label>
      <button className="btn" type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.defaultProps = {
  onSubmit: () => {},
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default memo(ContactForm);
