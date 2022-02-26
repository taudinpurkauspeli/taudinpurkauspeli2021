import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  Form, Button,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomTypeaheadSelect from '../../../../utils/CustomTypeaheadSelect';

const NewOptionForm = ({ addOption }) => {
  const { t } = useTranslation();

  const AddCheckSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, t('warningShort'))
      .max(999, t('warningLong'))
      .required(t('warningRequired')),
    description: Yup.string(),
    isRequired: Yup.number()
      .required(t('warningRequired'))
      .integer(),
  });

  const options = useSelector((state) => state.options);

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        isRequired: 2,
      }}
      validationSchema={AddCheckSchema}
      onSubmit={async (values) => {
        const option = options.filter((r) => r.name === values.name);
        addOption(
          option.length === 0
            ? values
            : { ...option[0], ...values },
        );
      }}
    >
      {({
        handleSubmit,
        handleChange,
        setFieldValue,
        values,
      }) => (
        <div>
          <Form onSubmit={handleSubmit}>
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
                value={values.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="isRequired">
              <Form.Check
                defaultChecked
                label={t('required')}
                name="isRequired"
                type="radio"
                id="inline-radio-1"
                value={2}
                onChange={() => setFieldValue('isRequired', 2)}
              />
              <Form.Check
                label={t('voluntary')}
                name="isRequired"
                type="radio"
                id="inline-radio-2"
                value={1}
                checked={values.isRequired === 1}
                onChange={() => setFieldValue('isRequired', 1)}
              />
              <Form.Check
                label={t('wrong')}
                name="isRequired"
                type="radio"
                id="inline-radio-3"
                value={0}
                checked={values.isRequired === 0}
                onChange={() => setFieldValue('isRequired', 0)}
              />
            </Form.Group>
            <Button className="submitButton" type="submit">{t('buttonSubmitNewDifferential')}</Button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default NewOptionForm;
