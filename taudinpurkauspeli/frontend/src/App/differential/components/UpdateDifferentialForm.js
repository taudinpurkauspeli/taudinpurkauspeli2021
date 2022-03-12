import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Form, Button,
} from 'react-bootstrap';

const UpdateDifferentialForm = ({
  name,
  description,
  updateDifferential,
}) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name,
      description,
    },
    validationSchema: Yup.object().shape({
      description: Yup.string(),
    }),
    onSubmit: (values) => {
      updateDifferential({
        description: values.description,
      });
    },
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>{t('title')}</Form.Label>
        <Form.Control
          disabled
          type="text"
          placeholder={t('write')}
          {...formik.getFieldProps('name')}
        />
        <Form.Text className="text-muted">
          {t('differentialNameInstruction')}
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>{t('description')}</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          {...formik.getFieldProps('description')}
        />
      </Form.Group>
      <Button className="submitButton" type="submit">{t('buttonUpdate')}</Button>
    </Form>
  );
};

export default UpdateDifferentialForm;
