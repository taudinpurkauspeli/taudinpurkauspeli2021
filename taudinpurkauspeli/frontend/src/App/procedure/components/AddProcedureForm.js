import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import { validateName } from '../../../utils/Helper';

const newProcedureForm = ({ addProcedure }) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: Yup.object({
      title: validateName(),
    }),
    onSubmit: (values) => {
      addProcedure({
        name: values.title,
      });
    },
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>{t('procedureTitle')}</Form.Label>
        <Form.Control
          type="text"
          {...formik.getFieldProps('title')}
          isInvalid={!!formik.errors.title}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.title}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" className="submitButton">{t('buttonSubmit')}</Button>
    </Form>
  );
};

export default newProcedureForm;
