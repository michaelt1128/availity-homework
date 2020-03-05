import React, { useState } from 'react';
import { Form, Field } from '@availity/form';
import { Button, Card } from 'reactstrap';
import * as yup from 'yup';
import { useAppStore } from '@/hooks';

const schema = yup.object().shape({
  firstName: yup
    .string()
    .isRequired(true, 'This Field is Required.')
    .matches(/^\w+$/, 'The name must be at least one character'),
  lastName: yup
    .string()
    .isRequired(true, 'This Field is Required.')
    .matches(/^\w+$/, 'The name must be at least one character'),
  npi: yup
    .string()
    .isRequired(true, 'This Field is Required.')
    .matches(/^\d{10}?$/, 'NPI Number must be 10 digits'),
  address: yup
    .string()
    .isRequired(true, 'This Field is Required.')
    .matches(/^(\S+.+)*$/, 'The Business Address must be at least one character'),
  email: yup
    .string()
    .isRequired(true, 'This Field is Required.')
    .matches(/\S+@\S+\.\S+/, 'The Business Address must be at least one character'),
});

async function stall(stallTime = 3000) {
  await new Promise(resolve => setTimeout(resolve, stallTime));
}

const RegistrationForm = () => {
  const { setLoading, setRegistered } = useAppStore(store => ({
    setLoading: store.setLoading,
    setRegistered: store.setRegistered
  }));
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [npi, setNpi] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    await stall();
    setLoading(false);
    setRegistered(true);
    resetForm();
  };

  return (
    <Card body>
      <Form
        initialValues={{
          firstName,
          lastName,
          npi,
          address,
          email,
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Field name="firstName" type="text" label="First Name" />
        <Field name="lastName" type="text" label="Last Name" />
        <Field name="npi" type="text" label="NPI Number" />
        <Field name="address" type="text" label="Address" />
        <Field name="email" type="text" label="Email" />
        <Button type="submit" color="primary" className="float-right">
          Register
        </Button>
      </Form>
    </Card>
  );
};

export default RegistrationForm;
