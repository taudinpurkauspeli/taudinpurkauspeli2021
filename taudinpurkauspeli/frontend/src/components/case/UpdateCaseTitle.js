/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

const UpdateCaseTitle = ({ c, updateCaseTitle }) => {
  const { t } = useTranslation();

  const [title, setTitle] = useState(c.title);

  const caseSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, t('warningShort'))
      .max(999, t('warningLong'))
      .required(t('warningRequired')),
  });

  const handleTitleUpdate = (values) => {
    updateCaseTitle({
      title: values.title,
      anamnesis: c.anamnesis,
      hidden: c.hidden,
    });

    setTitle(values.title);
  };

  return (
    <Formik
      initialValues={{
        title,
      }}
      validationSchema={caseSchema}
      onSubmit={handleTitleUpdate}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="updateTitle" style={{ width: '30rem' }}>
            <Form.Control
              className="titleChangeInput"
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              isInvalid={!!errors.title}
            />
            <Form.Text className="text-muted">
              {t('caseTitleInstruction')}
            </Form.Text>
            <Form.Control.Feedback type="invalid" role="alert" aria-label="from feedback">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateCaseTitle;
