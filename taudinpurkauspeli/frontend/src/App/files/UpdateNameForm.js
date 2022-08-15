import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { validateName } from '../../utils/Helper';

const UpdateNameForm = ({ entity, updateEntity }) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: entity.name,
    },
    validationSchema: Yup.object({
      name: validateName(),
    }),
    onSubmit: (values) => {
      updateEntity({
        ...entity,
        name: values.name,
      });
    },
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Group controlId="updateTitle" style={{ width: '30rem' }}>
        <Form.Control
          type="text"
          {...formik.getFieldProps('name')}
          isInvalid={!!formik.errors.name}
        />
        <Form.Control.Feedback type="invalid" role="alert" aria-label="from feedback">
          {formik.errors.name}
        </Form.Control.Feedback>
      </Form.Group>
      <Button className="submitButton" type="submit">{t('edit')}</Button>
    </Form>
  );
};

export default UpdateNameForm;
