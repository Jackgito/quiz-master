import React, { useState, useRef } from 'react';
import { Form, ButtonToolbar, Button, Schema, Message, useToaster } from 'rsuite';

const { StringType } = Schema.Types;

const model = Schema.Model({
  username: StringType().isRequired('Username is required').minLength(3, 'Username must be at least 3 characters long'),
  password: StringType().isRequired('Password is required').minLength(6, 'Password must be at least 6 characters long')
});

const SignUpForm = ({ onSubmit, onCancel }) => {
  const [formValue, setFormValue] = useState({
    username: '',
    password: '',
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
      return;
    }

    setLoading(true);

    // Sanitize input
    const sanitizedFormValue = {
      username: formValue.username.trim(),
      password: formValue.password.trim()
    };

    try {
      // Simulate API call
      const response = await fakeApiCall(sanitizedFormValue);

      if (response.success) {
        toaster.push(<Message type="success">Sign up successful!</Message>, { placement: 'topCenter' });
        onSubmit();  // Close the modal after successful submission
      } else {
        toaster.push(<Message type="error">{response.message}</Message>, { placement: 'topCenter' });
      }
    } catch (error) {
      toaster.push(<Message type="error">An error occurred. Please try again.</Message>, { placement: 'topCenter' });
    } finally {
      setLoading(false);
    }
  };

  // Fake API call for demonstration purposes
  const fakeApiCall = async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  };

  return (
    <Form
      ref={formRef}
      onChange={handleChange}   // Form updates without validation
      formValue={formValue}
      model={model}             // Schema model for validation
      fluid
      checkTrigger="none"       // Disable real-time validation, only validate on submit
    >
      <Form.Group controlId="username-1">
        <Form.ControlLabel>Username</Form.ControlLabel>
        <Form.Control 
          name="username" 
          errorMessage={formError.username}  // Display errors if any on submit
          errorPlacement="bottomEnd"
        />
      </Form.Group>

      <Form.Group controlId="password-1">
        <Form.ControlLabel>Password</Form.ControlLabel>
        <Form.Control 
          name="password" 
          type="password" 
          autoComplete="off" 
          errorMessage={formError.password}  // Display errors if any on submit
          errorPlacement="bottomEnd"
        />
      </Form.Group>

      <Form.Group>
        <ButtonToolbar>
          <Button appearance="primary" onClick={handleSubmit} loading={loading}>SIGN UP</Button>
        </ButtonToolbar>
      </Form.Group>
    </Form>
  );
};

export default SignUpForm;
