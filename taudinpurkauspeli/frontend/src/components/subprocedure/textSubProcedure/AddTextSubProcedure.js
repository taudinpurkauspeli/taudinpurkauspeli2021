/* eslint-disable linebreak-style */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Form, Button,
} from 'react-bootstrap';

const AddTextSubProcedure = ({ handleSubProcedureAdd }) => {
  const { t } = useTranslation();

  const newTextSubProcedureSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, t('warningShort'))
      .max(999, t('warningLong'))
      .required(t('warningRequired')),
    priority: Yup.string(),
    text: Yup.string(),
  });

  const innerHandleSubProcedureAdd = (values) => {
    handleSubProcedureAdd({
      priority: values.priority,
      type: 'TEXT',
      title: values.title,
      text: values.text,
    });
  };

  return (
    <Formik
      initialValues={{
        priority: '',
        title: '',
        text: '',

      }}
      validationSchema={newTextSubProcedureSchema}
      onSubmit={innerHandleSubProcedureAdd}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group md="6" controlId="title">
            <Form.Label>{t('title')}</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder={t('write')}
              value={values.title}
              onChange={handleChange}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid" role="alert" aria-label="from feedback">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group md="6" controlId="priority">
            <Form.Label>{t('subProcedurePriority')}</Form.Label>
            <Form.Control
              type="text"
              name="priority"
              placeholder={t('giveNumber')}
              value={values.priority}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>{t('textToAdd')}</Form.Label>
            <Form.Control
              as="textarea"
              name="text"
              rows={10}
              value={values.text}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit">{t('buttonSubmit')}</Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddTextSubProcedure;
