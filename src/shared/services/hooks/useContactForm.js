import { useState } from 'react';

export default function useContactForm(initialState, submitFunction) {
  const [formState, setFormState] = useState(initialState);

  const inputChangeHandler = ({ target }) => {
    const { name, value } = target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const reset = () => setFormState(initialState);

  const submitHandler = event => {
    event.preventDefault();
    submitFunction(formState);
    reset();
  };

  return [formState, inputChangeHandler, submitHandler];
}
