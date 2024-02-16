import { useState, } from 'react';

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import {
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import './sign-up-form.styles.scss';

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
      if (e.code === 'auth/email-already-in-use') alert('Email already in use.');
      else console.log('Error adding user.', e.message);
    }
  }

  const handleFormChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  return (
    <div
      className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
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
        <Button type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;