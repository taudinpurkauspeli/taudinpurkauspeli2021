/* eslint-disable linebreak-style */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';

const newCaseForm = ({ addCase }) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      title: '',
      anamnesis: '',
      hidden: false,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(2, t('warningShort'))
        .max(999, t('warningLong'))
        .required(t('warningRequired')),
      anamnesis: Yup.string(),
      hidden: Yup.bool(),
    }),
    onSubmit: (values) => {
      addCase({
        title: values.title,
        anamnesis: values.anamnesis,
        hidden: values.hidden,
      });
    },
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit} spellCheck="false">
      <Form.Group controlId="title">
        <Form.Label>{t('caseTitle')}</Form.Label>
        <Form.Control
          type="text"
          {...formik.getFieldProps('title')}
          isInvalid={!!formik.errors.title}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.title}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="anamnesis">
        <Form.Label>{t('caseAnamnesis')}</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          {...formik.getFieldProps('anamnesis')}
        />
      </Form.Group>
      <Form.Group controlId="hidden">
        <Form.Check
          label={t('hideCase')}
          {...formik.getFieldProps('hidden')}
        />
      </Form.Group>
      <Button className="submitButton" type="submit">{t('buttonSubmitNewCase')}</Button>
    </Form>
  );
};

export default newCaseForm;
