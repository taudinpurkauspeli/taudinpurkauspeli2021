/* eslint-disable linebreak-style */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Form, Button,
} from 'react-bootstrap';

const AddDifferentialForm = ({ addDifferential }) => {
  const { t } = useTranslation();

  const newDifferentialSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, t('warningShort'))
      .max(999, t('warningLong'))
      .required(t('warningRequired')),
    description: Yup.string(),
  });

  const handleDifferentialAdd = (values) => {
    addDifferential({
      name: values.name,
      description: values.description,
    });
  };

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
      }}
      validationSchema={newDifferentialSchema}
      onSubmit={handleDifferentialAdd}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group md="6" controlId="name">
            <Form.Label>{t('addDifferential')}</Form.Label>
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
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>{t('description')}</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              value={values.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Button className="submitButton" type="submit">{t('buttonSubmitNewDifferential')}</Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddDifferentialForm;
