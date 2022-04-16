import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Form, Button,
} from 'react-bootstrap';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import CustomTypeaheadSelect from '../../../../../utils/CustomTypeaheadSelect';
import { validateName } from '../../../../../utils/Helper';

const NewOptionGroupForm = ({ addOptionGroup }) => {
  const { t } = useTranslation();
  const optionGroups = useSelector((state) => state.optionGroups);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object().shape({
      name: validateName(),
    }),
    onSubmit: async (values) => {
      const group = optionGroups.filter((r) => r.name === values.name);
      addOptionGroup(
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
          label={t('addOptionGroup')}
          options={optionGroups}
        />
        <Button className="submitButton" type="submit">{t('buttonSubmitNewOptionGroup')}</Button>
      </Form>
    </FormikProvider>
  );
};

export default NewOptionGroupForm;
