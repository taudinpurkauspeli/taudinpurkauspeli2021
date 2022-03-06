/* eslint-disable linebreak-style */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import {
  Form, Button,
} from 'react-bootstrap';
import { validateName } from '../../../../utils/Helper';
import CustomTypeaheadSelect from '../../../../utils/CustomTypeaheadSelect';

const AddDifferentialGroupForm = ({ addDifferentialGroup }) => {
  const { t } = useTranslation();
  const differentialGroups = useSelector((state) => state.differentialGroups);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: validateName(),
    }),
    onSubmit: async (values) => {
      const group = differentialGroups.filter((r) => r.name === values.name);
      addDifferentialGroup(
        group.length === 0
          ? values
          : group[0],
      );
    },
  });

  return (
    <FormikProvider value={formik}>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <CustomTypeaheadSelect
          name="name"
          label={t('addDifferentialGroup')}
          options={differentialGroups}
        />
        <Button className="submitButton" type="submit">{t('buttonSubmitNewDifferential')}</Button>
      </Form>
    </FormikProvider>
  );
};

export default AddDifferentialGroupForm;
