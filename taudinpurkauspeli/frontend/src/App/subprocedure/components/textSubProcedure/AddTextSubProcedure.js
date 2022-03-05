/* eslint-disable linebreak-style */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Form, Button,
} from 'react-bootstrap';

const AddTextSubProcedure = ({ handleSubProcedureAdd }) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      priority: '',
      title: '',
      text: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(2, t('warningShort'))
        .max(999, t('warningLong'))
        .required(t('warningRequired')),
      priority: Yup.number()
        .typeError(t('warningPositiveInteger'))
        .required(t('warningRequired'))
        .positive(t('warningPositiveInteger'))
        .integer(t('warningPositiveInteger')),
      text: Yup.string(),
    }),
    onSubmit: (values) => {
      handleSubProcedureAdd({
        ...values,
        priority: Number(values.priority),
        type: 'TEXT',
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
      <Form.Group controlId="priority">
        <Form.Label>{t('subProcedurePriority')}</Form.Label>
        <Form.Control
          type="text"
          placeholder={t('giveNumber')}
          {...formik.getFieldProps('priority')}
          isInvalid={!!formik.errors.priority}
        />
        <Form.Control.Feedback type="invalid" role="alert" aria-label="from feedback">
          {formik.errors.priority}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="text">
        <Form.Label>{t('textToAdd')}</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          {...formik.getFieldProps('text')}
        />
      </Form.Group>
      <Button className="submitButton" type="submit">{t('buttonSubmit')}</Button>
    </Form>
  );
};

export default AddTextSubProcedure;
