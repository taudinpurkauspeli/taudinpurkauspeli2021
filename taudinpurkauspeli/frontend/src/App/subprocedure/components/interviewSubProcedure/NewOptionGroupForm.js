import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Form, Button,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import CustomTypeaheadSelect from '../../../../utils/CustomTypeaheadSelect';

const NewOptionGroupForm = ({ addOptionGroup }) => {
  const { t } = useTranslation();

  const AddCheckSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, t('warningShort'))
      .max(999, t('warningLong'))
      .required(t('warningRequired')),
  });

  const optionGroups = useSelector((state) => state.optionGroups);

  return (
    <Formik
      initialValues={{
        name: '',
      }}
      validationSchema={AddCheckSchema}
      onSubmit={async (values) => {
        const group = optionGroups.filter((r) => r.name === values.name);
        addOptionGroup(
          group.length === 0
            ? values
            : group[0],
        );
      }}
    >
      {({ handleSubmit }) => (
        <div>
          <Form onSubmit={handleSubmit}>
            <CustomTypeaheadSelect
              name="name"
              label={t('addOptionGroup')}
              options={optionGroups}
            />
            <Button className="submitButton" type="submit">{t('buttonSubmitNewDifferential')}</Button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default NewOptionGroupForm;
