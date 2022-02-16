/* eslint-disable linebreak-style */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Form, Button,
} from 'react-bootstrap';

const AddDifferentialGroupForm = ({ addDifferentialGroup }) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, t('warningShort'))
        .max(999, t('warningLong'))
        .required(t('warningRequired')),
    }),
    onSubmit: (values) => {
      addDifferentialGroup({
        name: values.name,
      });
    },
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>{t('addDifferentialGroup')}</Form.Label>
        <Form.Control
          type="text"
          placeholder={t('write')}
          {...formik.getFieldProps('name')}
          isInvalid={!!formik.errors.name}
        />
        <Form.Control.Feedback type="invalid" role="alert" aria-label="from feedback">
          {formik.errors.name}
        </Form.Control.Feedback>
      </Form.Group>
      <Button className="submitButton" type="submit">{t('buttonSubmitNewDifferentialGroup')}</Button>
    </Form>
  );
};

export default AddDifferentialGroupForm;
