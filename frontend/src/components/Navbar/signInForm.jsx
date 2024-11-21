import React, { useState, useRef } from 'react';
import { Form, Button } from 'rsuite';
import useAuthenticateUser from '../../hooks/useAuthenticateUser';

const SignInForm = ({ onSubmit }) => {
  const authenticateUser = useAuthenticateUser();
  const [formValue, setFormValue] = useState({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const handleChange = (value) => {
    setFormValue(value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { success } = await authenticateUser(formValue.username, formValue.password);
    setLoading(false);
    if (success) { onSubmit(); }
  };

  return (
    <Form
      ref={formRef}
      onChange={handleChange}
      formValue={formValue}
      fluid
      checkTrigger="none"       // Disable real-time validation, only validate on submit
    >
      <Form.Group controlId="username-1">
        <Form.ControlLabel>Username</Form.ControlLabel>
        <Form.Control 
          name="username" 
          autoComplete="username"
        />
      </Form.Group>

      <Form.Group controlId="password-1">
        <Form.ControlLabel>Password</Form.ControlLabel>
        <Form.Control 
          name="password" 
          type="password" 
          autoComplete="current-password"
        />
      </Form.Group>

      <Form.Group>
          <Button appearance="primary" onClick={handleSubmit} loading={loading}>
            Sign In
          </Button>
      </Form.Group>
    </Form>
  );
}

export default SignInForm;
