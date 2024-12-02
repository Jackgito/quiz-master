import React, { useState, useRef } from 'react';
import { Form, Button, Schema, Message, useToaster } from 'rsuite';

const { StringType } = Schema.Types;

const model = Schema.Model({
  username: StringType().isRequired('Username is required').minLength(3, 'Username must be at least 3 characters long'),
  password: StringType().isRequired('Password is required').minLength(6, 'Password must be at least 6 characters long'),
  confirmPassword: StringType()
    .addRule((value, data) => {
      if (value !== data.password) {
        return false;
      }
      return true;
    }, 'Passwords do not match')
    .isRequired('Confirm password is required')
});

const SignUpForm = ({ onSubmit }) => {
  const [formValue, setFormValue] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  const toaster = useToaster();
  const formRef = useRef(null);

  // Update form value without validating or showing errors
  const handleChange = (value) => {
    setFormValue(value);
  };

  // Validate and show errors only on form submission
  const handleSubmit = async () => {
    const checkResult = formRef.current.check(); // Use formRef to validate form
  
    if (!checkResult) {
      // If there are errors, formRef will automatically update formError and prevent submission
      setFormError(formRef.current.state.formError);
      return;
    }
    
    setLoading(true);
    
    // Sanitize input
    const sanitizedFormValue = {
      username: formValue.username.trim(),
      password: formValue.password.trim()
    };
    
    try {
      // Make an API call to create a new user
      const response = await fetch('http://localhost:8000/api/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sanitizedFormValue)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toaster.push(<Message type="success">Sign up successful!</Message>, { placement: 'topCenter' });
        console.log(data);
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
      model={model}             // Schema model for validation
      fluid
      checkTrigger="none"       // Disable real-time validation, only validate on submit
    >
      <Form.Group controlId="username-1">
        <Form.ControlLabel>Username</Form.ControlLabel>
        <Form.Control name="username" />
        {formError.username && <Form.ErrorMessage show={true} placement="leftStart">
          {formError.username}
        </Form.ErrorMessage>}
      </Form.Group>
      <Form.Group controlId="password-1">
        <Form.ControlLabel>Password</Form.ControlLabel>
        <Form.Control name="password" type="password" />
        {formError.password && <Form.ErrorMessage show={true} placement="leftStart">
          {formError.password}
        </Form.ErrorMessage>}
      </Form.Group>
      <Form.Group controlId="confirm-password-1">
        <Form.ControlLabel>Confirm Password</Form.ControlLabel>
        <Form.Control name="confirmPassword" type="password" />
        {formError.confirmPassword && <Form.ErrorMessage show={true} placement="leftStart">
          {formError.confirmPassword}
        </Form.ErrorMessage>}
      </Form.Group>
      <Form.Group>
          <Button appearance="primary" onClick={handleSubmit} loading={loading}>
            Sign Up
          </Button>
      </Form.Group>
    </Form>
  );
}

export default SignUpForm;