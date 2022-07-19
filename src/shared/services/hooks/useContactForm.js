import { useState } from 'react';

export default function useContactForm(
  initialState,
  submitFunction,
  onFocusFunction
) {
  const [formState, setFormState] = useState(initialState);

  const focusHandler = () => onFocusFunction();

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

  return [formState, inputChangeHandler, submitHandler, focusHandler];
}
