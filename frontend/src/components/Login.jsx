import {
  Form, Button, Row, Col,
} from 'react-bootstrap';
import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import registrationImg from '../assets/img/registration.jpg';

YupPassword(yup);

const schema = yup.object({
  username: yup.string(),
  password: yup.string()
    .min(8)
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .minSymbols(1),
});

const Login = () => (
  <Row className="justify-content-between align-content-center">
    <Col xs="12" md="6" className="mb-3 mb-md-0">
      <img src={registrationImg} className="img-fluid d-block mx-auto" alt="" />
    </Col>
    <Col xs="12" md="6" className="d-flex flex-column justify-content-center">
      <h1 className="mb-4 text-center">Registration</h1>

      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 1000);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
          >
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Control
                name="username"
                type="username"
                placeholder="Username"
                autoComplete="on"
                required="required"
                onChange={handleChange}
                value={values.username}
                isValid={touched.username && !errors.username}
                isInvalid={touched.username && errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {touched.username && errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="on"
                required="required"
                onChange={handleChange}
                value={values.password}
                isValid={touched.password && !errors.password}
                isInvalid={touched.password && errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {touched.password && errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              variant="outline-primary"
              className="w-100"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Col>
  </Row>
);

export default Login;
