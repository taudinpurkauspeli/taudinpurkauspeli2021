import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  Form, Button,
} from 'react-bootstrap';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import CustomTypeaheadSelect from '../../../../utils/CustomTypeaheadSelect';

const NewOptionForm = ({ addOption }) => {
  const { t } = useTranslation();
  const options = useSelector((state) => state.options);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      isRequired: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(2, t('warningShort'))
        .max(999, t('warningLong'))
        .required(t('warningRequired')),
      description: Yup.string(),
      isRequired: Yup.number()
        .required(t('warningRequired'))
        .integer(),
    }),
    onSubmit: async (values) => {
      const option = options.filter((r) => r.name === values.name);
      addOption(
        option.length === 0
          ? { ...values, isRequired: Number(values.isRequired) }
          : { ...option[0], ...values, isRequired: Number(values.isRequired) },
      );
    },
  });

  return (
    <FormikProvider value={formik}>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <CustomTypeaheadSelect
          name="name"
          label={t('addOption')}
          options={options}
        />
        <Form.Group controlId="description">
          <Form.Label>{t('description')}</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            {...formik.getFieldProps('description')}
          />
        </Form.Group>
        <Form.Group controlId="isRequired">
          <Form.Check
            label={t('required')}
            name="isRequired"
            type="radio"
            value={2}
            onChange={formik.getFieldProps('isRequired').onChange}
          />
          <Form.Check
            label={t('voluntary')}
            name="isRequired"
            type="radio"
            value={1}
            onChange={formik.getFieldProps('isRequired').onChange}
          />
          <Form.Check
            label={t('wrong')}
            name="isRequired"
            type="radio"
            value={0}
            onChange={formik.getFieldProps('isRequired').onChange}
          />
        </Form.Group>
        <Button className="submitButton" type="submit">{t('buttonSubmitNewDifferential')}</Button>
      </Form>
    </FormikProvider>
  );
};

export default NewOptionForm;
