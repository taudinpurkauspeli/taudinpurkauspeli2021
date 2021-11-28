/* eslint-disable linebreak-style */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';

const newCase = ({ addCase }) => {
  const { t } = useTranslation();

  const newCaseSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, t('warningShort'))
      .max(999, t('warningLong'))
      .required(t('warningRequired')),
    anamnesis: Yup.string(),
    hidden: Yup.bool(),
  });

  const handleCaseAdd = (values) => {
    addCase({
      title: values.title,
      anamnesis: values.anamnesis,
      hidden: values.hidden,
    });
  };

  return (
    <Formik
      initialValues={{
        title: '',
        anamnesis: '',
        hidden: false,
      }}
      validationSchema={newCaseSchema}
      onSubmit={handleCaseAdd}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group md="6" controlId="title">
            <Form.Label>{t('caseTitle')}</Form.Label>
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
          <Form.Group className="mb-3" controlId="anamnesis">
            <Form.Label>{t('caseAnamnesis')}</Form.Label>
            <Form.Control
              as="textarea"
              name="anamnesis"
              rows={3}
              value={values.anamnesis}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="hidden">
            <Form.Check
              required
              name="hidden"
              label={t('hideCase')}
              value={values.hidden}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit">{t('buttonSubmitNewCase')}</Button>
        </Form>
      )}
    </Formik>
  );
};

export default newCase;
