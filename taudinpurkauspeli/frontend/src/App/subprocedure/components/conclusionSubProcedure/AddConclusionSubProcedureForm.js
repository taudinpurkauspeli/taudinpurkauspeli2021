import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Form, Button,
} from 'react-bootstrap';
import { validateName, validatePriority } from '../../../../utils/Helper';

const AddConclusionSubProcedureForm = ({ addSubProcedure }) => {
  const { t } = useTranslation();
  const caseDifferentials = useSelector((state) => state.differentialsUnderCase);

  const formik = useFormik({
    initialValues: {
      priority: '',
      title: '',
      text: '',
      differentialId: '',
    },
    validationSchema: Yup.object({
      title: validateName(),
      priority: validatePriority(),
      text: Yup.string(),
      differentialId: Yup.string()
        .required(t('warningRequired')),
    }),
    onSubmit: (values) => {
      addSubProcedure({
        ...values,
        differentialId: Number(values.differentialId),
        priority: Number(values.priority),
        type: 'CONCLUSION',
      });
    },
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>{t('title')}</Form.Label>
        <Form.Control
          type="text"
          placeholder={t('write')}
          {...formik.getFieldProps('title')}
          isInvalid={!!formik.errors.title}
        />
        <Form.Control.Feedback type="invalid" role="alert" aria-label="from feedback">
          {formik.errors.title}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="priority">
        <Form.Label>{t('subProcedurePriority')}</Form.Label>
        <Form.Control
          type="text"
          placeholder={t('giveNumber')}
          {...formik.getFieldProps('priority')}
          isInvalid={!!formik.errors.priority}
        />
        <Form.Control.Feedback type="invalid" role="alert" aria-label="from feedback">
          {formik.errors.priority}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="differentialId">
        <Form.Label>{t('subProcedureDifferential')}</Form.Label>
        <Form.Control
          as="select"
          {...formik.getFieldProps('differentialId')}
          isInvalid={!!formik.errors.differentialId}
        >
          <option key="blankChoice" hidden value>{t('selectDifferential')}</option>
          {caseDifferentials.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </Form.Control>
        <Form.Control.Feedback type="invalid" role="alert" aria-label="from feedback">
          {formik.errors.differentialId}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="text">
        <Form.Label>{t('textToAdd')}</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          {...formik.getFieldProps('text')}
        />
      </Form.Group>
      <Button className="submitButton" type="submit">{t('buttonSubmit')}</Button>
    </Form>
  );
};

export default AddConclusionSubProcedureForm;
