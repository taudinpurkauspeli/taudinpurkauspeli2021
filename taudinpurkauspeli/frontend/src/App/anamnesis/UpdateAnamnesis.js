/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Form, Button,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

const UpdateAnamnesis = ({ c, updateAnamnesis }) => {
  const { t } = useTranslation();

  const [anamnesis, setAnamnesis] = useState(c.anamnesis);

  const caseSchema = Yup.object().shape({
    anamnesis: Yup.string()
      .min(2, t('warningShort'))
      .max(5000, t('warningLong'))
      .required(t('warningRequired')),
  });

  const handleAnamnesisUpdate = (values) => {
    updateAnamnesis({
      ...c,
      anamnesis: values.anamnesis,
    });

    setAnamnesis(values.anamnesis);
  };

  return (
    <Formik
      initialValues={{
        anamnesis,
      }}
      validationSchema={caseSchema}
      onSubmit={handleAnamnesisUpdate}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="updateAnamnesis">
            <Form.Control
              className="anamnesisForm"
              as="textarea"
              name="anamnesis"
              value={values.anamnesis}
              onChange={handleChange}
              isInvalid={!!errors.anamnesis}
              rows={10}
            />
            <Form.Control.Feedback type="invalid" role="alert" aria-label="from feedback">
              {errors.anamnesis}
            </Form.Control.Feedback>
          </Form.Group>
          <Button className="submitButton" id="submit" type="submit">{t('buttonSaveAnamneesi')}</Button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateAnamnesis;
