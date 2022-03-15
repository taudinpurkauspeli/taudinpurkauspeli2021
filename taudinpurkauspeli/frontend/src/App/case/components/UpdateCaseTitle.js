import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { validateName } from '../../../utils/Helper';

const UpdateCaseTitle = ({ c, updateCaseTitle }) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      title: c.title,
    },
    validationSchema: Yup.object({
      title: validateName(),
    }),
    onSubmit: (values) => {
      updateCaseTitle({
        ...c,
        title: values.title,
      });
    },
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Group controlId="updateTitle" style={{ width: '30rem' }}>
        <Form.Control
          className="titleChangeInput"
          type="text"
          {...formik.getFieldProps('title')}
          isInvalid={!!formik.errors.title}
        />
        <Form.Text className="text-muted">
          {t('caseTitleInstruction')}
        </Form.Text>
        <Form.Control.Feedback type="invalid" role="alert" aria-label="from feedback">
          {formik.errors.title}
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};

export default UpdateCaseTitle;
