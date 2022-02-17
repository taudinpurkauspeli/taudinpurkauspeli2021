import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Form, Button,
} from 'react-bootstrap';

const UpdateTextSubProcedureForm = ({
  title,
  text,
  handleTextSubProcedureUpdate,
}) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      title,
      text,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(2, t('warningShort'))
        .max(999, t('warningLong'))
        .required(t('warningRequired')),
      priority: Yup.string(),
      text: Yup.string(),
    }),
    onSubmit: (values) => {
      handleTextSubProcedureUpdate({
        title: values.title,
        text: values.text,
      });
    },
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>{t('title')}</Form.Label>
        <Form.Control
          type="text"
          placeholder={t('write')}
          {...formik.getFieldProps('title')}
          isInvalid={!!formik.errors.title}
        />
        <Form.Control.Feedback type="invalid" role="alert" aria-label="from feedback">
          {formik.errors.title}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="text">
        <Form.Label>{t('textToAdd')}</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          {...formik.getFieldProps('text')}
        />
      </Form.Group>
      <Button className="submitButton" type="submit">{t('buttonUpdate')}</Button>
    </Form>
  );
};

export default UpdateTextSubProcedureForm;