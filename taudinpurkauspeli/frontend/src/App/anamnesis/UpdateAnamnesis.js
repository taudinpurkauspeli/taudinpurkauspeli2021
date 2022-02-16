/* eslint-disable linebreak-style */
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Form, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const UpdateAnamnesis = ({ c, updateAnamnesis }) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      anamnesis: c.anamnesis,
    },
    validationSchema: Yup.object({
      anamnesis: Yup.string()
        .min(2, t('warningShort'))
        .max(5000, t('warningLong'))
        .required(t('warningRequired')),
    }),
    onSubmit: (values) => {
      updateAnamnesis({
        ...c,
        anamnesis: values.anamnesis,
      });
    },
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Group controlId="updateAnamnesis">
        <Form.Control
          className="anamnesisForm"
          as="textarea"
          {...formik.getFieldProps('anamnesis')}
          isInvalid={!!formik.errors.anamnesis}
          rows={10}
        />
        <Form.Control.Feedback type="invalid" role="alert" aria-label="from feedback">
          {formik.errors.anamnesis}
        </Form.Control.Feedback>
      </Form.Group>
      <Button className="submitButton" type="submit">{t('buttonSaveAnamneesi')}</Button>
    </Form>
  );
};

export default UpdateAnamnesis;
