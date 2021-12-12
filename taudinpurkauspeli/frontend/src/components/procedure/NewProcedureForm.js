/* eslint-disable linebreak-style */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';

const newProcedureForm = ({ addProcedure }) => {
  const { t } = useTranslation();

  const newProcedureSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, t('warningShort'))
      .max(999, t('warningLong'))
      .required(t('warningRequired')),
  });

  const handleProcedureAdd = (values) => {
    addProcedure({
      title: values.title,
      anamnesis: values.anamnesis,
      hidden: values.hidden,
    });
  };

  return (
    <Formik
      initialValues={{
        title: '',
      }}
      validationSchema={newProcedureSchema}
      onSubmit={handleProcedureAdd}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group md="6" controlId="title">
            <Form.Label>{t('procedureTitle')}</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit">{t('buttonSubmitNewProcedure')}</Button>
        </Form>
      )}
    </Formik>
  );
};

export default newProcedureForm;
