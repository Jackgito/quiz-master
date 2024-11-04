import React, { useState, useRef } from 'react';
import { Form, Button, Message, useToaster } from 'rsuite';

const SignInForm = ({ onSubmit }) => {
  const [formValue, setFormValue] = useState({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const toaster = useToaster();
  const formRef = useRef(null);

  const handleChange = (value) => {
    setFormValue(value);
  };

  const handleSubmit = async () => {
    setLoading(true);

    // Sanitize input
    const sanitizedFormValue = {
      username: formValue.username.trim(),
      password: formValue.password.trim()
    };

    try {
      // Make an API call to authenticate a user
      const response = await fetch('http://localhost:8000/api/user/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sanitizedFormValue)
      });

      const data = await response.json();

      if (response.ok) {
        toaster.push(<Message type="success">Sign in successful!</Message>, { placement: 'topCenter' });
        sessionStorage.setItem('userId', data.userId);  // Store user ID in session storage
        onSubmit();  // Close the modal after successful submission
      } else {
        const errorMessage = data.error || 'An error occurred. Please try again.';
        toaster.push(<Message type="error">{errorMessage}</Message>, { placement: 'topCenter' });
      }
    } catch (error) {
      toaster.push(<Message type="error">Network error. Please try again.</Message>, { placement: 'topCenter' });
    } finally {
      setLoading(false);
    }
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
        <Form.Control name="username" />
      </Form.Group>
      <Form.Group controlId="password-1">
        <Form.ControlLabel>Password</Form.ControlLabel>
        <Form.Control name="password" type="password" />
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
