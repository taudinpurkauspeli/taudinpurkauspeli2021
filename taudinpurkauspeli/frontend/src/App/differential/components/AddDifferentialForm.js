/* eslint-disable linebreak-style */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Form, Button,
} from 'react-bootstrap';
import { validateName } from '../../../utils/Helper';

const AddDifferentialForm = ({ addDifferential }) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: Yup.object({
      name: validateName(),
      description: Yup.string(),
    }),
    onSubmit: (values) => {
      addDifferential({
        name: values.name,
        description: values.description,
      });
    },
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>{t('addDifferential')}</Form.Label>
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
      <Form.Group controlId="description">
        <Form.Label>{t('description')}</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          {...formik.getFieldProps('description')}
        />
      </Form.Group>
      <Button className="submitButton" type="submit">{t('buttonSubmitNewDifferential')}</Button>
    </Form>
  );
};

export default AddDifferentialForm;
