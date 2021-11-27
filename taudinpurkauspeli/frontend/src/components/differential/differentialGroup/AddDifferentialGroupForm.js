/* eslint-disable linebreak-style */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Form, Button,
} from 'react-bootstrap';

const AddDifferentialGroupForm = ({ addDifferentialGroup }) => {
  const { t } = useTranslation();

  const newDifferentialGroupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, t('warningShort'))
      .max(999, t('warningLong'))
      .required(t('warningRequired')),
  });

  const handleDifferentialGroupAdd = (values) => {
    addDifferentialGroup({
      name: values.name,
    });
  };

  return (
    <Formik
      initialValues={{
        name: '',
      }}
      validationSchema={newDifferentialGroupSchema}
      onSubmit={handleDifferentialGroupAdd}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group md="6" controlId="name">
            <Form.Label>{t('addDifferentialGroup')}</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder={t('write')}
              value={values.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid" role="alert" aria-label="from feedback">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit">{t('buttonSubmitNewDifferentialGroup')}</Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddDifferentialGroupForm;
