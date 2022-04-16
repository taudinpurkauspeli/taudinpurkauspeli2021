import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik, FormikProvider } from 'formik';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
  Form, Button,
} from 'react-bootstrap';
import { validateName } from '../../../utils/Helper';
import CustomTypeaheadSelect from '../../../utils/CustomTypeaheadSelect';

const AddDifferentialForm = ({ addDifferential }) => {
  const { t } = useTranslation();
  const differentials = useSelector((state) => state.differentials);
  const caseProcedures = useSelector((state) => state.proceduresUnderCase);

  const formik = useFormik({
    initialValues: {
      name: '',
      procedureId: undefined,
      description: '',
    },
    validationSchema: Yup.object({
      name: validateName(),
      description: Yup.string(),
    }),
    onSubmit: async (values) => {
      const differential = differentials.filter((r) => r.name === values.name);
      addDifferential(
        differential.length === 0
          ? { ...values, procedureId: Number(values.procedureId) }
          : { ...differential[0], ...values, procedureId: Number(values.procedureId) },
      );
    },
  });

  return (
    <FormikProvider value={formik}>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Form.Group controlId="name">
          <CustomTypeaheadSelect
            name="name"
            label={t('addDifferential')}
            options={differentials}
          />
        </Form.Group>
        <Form.Group controlId="procedureId">
          <Form.Label>{t('differentialProcedure')}</Form.Label>
          <Form.Control
            as="select"
            {...formik.getFieldProps('procedureId')}
            isInvalid={!!formik.errors.procedureId}
          >
            <option value={undefined}>{t('anamnesis')}</option>
            {caseProcedures.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>{t('description')}</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            {...formik.getFieldProps('description')}
          />
        </Form.Group>
        <Button className="submitButton" type="submit">{t('buttonSubmitNewDifferential')}</Button>
      </Form>
    </FormikProvider>
  );
};

export default AddDifferentialForm;
