import { useState } from 'react';

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {
    email,
    password,
  } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user); // eslint-disable-line
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signInAuthUserWithEmailAndPassword({
        email,
        password
      });
      console.log(response);
      resetFormFields();
    } catch (e) {
      console.log(e);
    }
  }

  const handleFormChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  return (
    <div
      className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form
        onSubmit={handleFormSubmit}>
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
          type="password" />
        <div
          className="buttons-container">
          <Button
            type="submit">
            Sign In
          </Button>
          <Button
            onClick={signInWithGoogle}
            buttonType="google">
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;