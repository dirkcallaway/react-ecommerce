import { useState } from 'react';

import FormInput from '../form-input/form-input.component';

import {
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
import { Form } from 'react-router-dom'; // eslint-disable-line

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {
    displayName,
    email,
    password,
    confirmPassword,
  } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword({
        email,
        password,
      });
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (e) {
      console.log(e);
      if (e.code === 'auth/email-already-in-use') alert('Email already in use.');
      else console.log('Error adding user.', e.message);
    }
  }

  const handleFormChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form
        onSubmit={handleFormSubmit}>
        <FormInput
          onChange={handleFormChange}
          name="displayName"
          value={displayName}
          label="Display Name"
          required
          type="text"/>
        <FormInput
          onChange={handleFormChange}
          name="email"
          value={email}
          label="Email"
          required
          type="email"/>
        <FormInput
          onChange={handleFormChange}
          name="password"
          value={password}
          label="Password"
          required
          type="password"/>
        <FormInput
          onChange={handleFormChange}
          name="confirmPassword"
          value={confirmPassword}
          label="Confirm Password"
          required
          type="password" />
        <button type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;