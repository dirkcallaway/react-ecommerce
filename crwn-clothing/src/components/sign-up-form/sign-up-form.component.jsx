import { useState } from 'react';

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

  const handleFormChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form
        onSubmit={() => { }}>
        <label>
          Display Name
        </label>
        <input
          onChange={handleFormChange}
          name="displayName"
          value={displayName}
          required
          type="text"/>
        <label>
          Email
        </label>
        <input
          onChange={handleFormChange}
          name="email"
          value={email}
          required
          type="email"/>
        <label>
          Password
        </label>
        <input
          onChange={handleFormChange}
          name="password"
          value={password}
          required
          type="password"/>
        <label>
          Confirm Password
        </label>
        <input
          onChange={handleFormChange}
          name="confirmPassword"
          value={confirmPassword}
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