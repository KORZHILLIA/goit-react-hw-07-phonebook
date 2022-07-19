import { useState } from 'react';
import styles from './contactEditor.module.css';

const formInitialState = {
  name: '',
  phone: '',
};

const ContactEditor = ({ onSubmit }) => {
  const [select, setSelect] = useState({
    whatToEdit: '',
  });

  const [input, setInput] = useState('');

  const [form, setForm] = useState(formInitialState);

  function selectHandler({ target }) {
    setSelect({ whatToEdit: target.value });
  }

  function inputChangeHandler({ target }) {
    setInput(target.value);
  }

  function intemediateFormChanger() {
    setInput('');
    setForm(prevState => ({ ...prevState, [whatToEdit]: input }));
    setSelect({ whatToEdit: '' });
  }

  function finalEditHandler(event) {
    event.preventDefault();
    let ultimateForm = {};
    const { name, phone } = form;

    if (!name && !phone) {
      setForm(formInitialState);
      onSubmit(false);
      return;
    } else if (!name) {
      ultimateForm = { phone };
    } else if (!phone) {
      ultimateForm = { name };
    } else {
      ultimateForm = form;
    }
    onSubmit(ultimateForm);
    setForm(formInitialState);
  }

  const { whatToEdit } = select;
  return (
    <form className={styles.form} onSubmit={finalEditHandler}>
      <select
        className={styles.select}
        name="select"
        value={whatToEdit}
        onChange={selectHandler}
      >
        <option value="">Choose what do you want to edit</option>
        <option value="name">Name</option>
        <option value="phone">Phone</option>
      </select>
      {whatToEdit && (
        <>
          <input
            className={styles.input}
            type={whatToEdit === 'name' ? 'text' : 'tel'}
            onChange={inputChangeHandler}
          />
          <button
            className={`btn ${styles.inputBtn}`}
            type="button"
            onClick={intemediateFormChanger}
          >
            Done
          </button>
        </>
      )}
      <button className="btn" type="submit">
        Edit
      </button>
    </form>
  );
};

export default ContactEditor;
