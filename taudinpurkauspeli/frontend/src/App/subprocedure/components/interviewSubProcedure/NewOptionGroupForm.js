import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Form, Button,
} from 'react-bootstrap';
import { Formik, useField } from 'formik';
import * as Yup from 'yup';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useSelector } from 'react-redux';

const CustomTypeaheadSelect = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helper] = useField(props);
  const { t } = useTranslation();
  return (
    <>
      <Form.Group controlId={`form-${props.name}`}>
        <Form.Label>{props.label}</Form.Label>
        <Typeahead
          id={props.name}
          multiple={false}
          onChange={(selected) => {
            const value = selected.length > 0 ? selected[0].name : '';
            helper.setValue(value);
          }}
          onInputChange={(text) => helper.setValue(text)}
          onBlur={() => helper.setTouched(true)}
          allowNew={false}
          labelKey={props.name}
          options={props.options}
          placeholder={t('write')}
          emptyLabel=""
          {...(meta.touched && meta.error
            ? { isInvalid: true, className: 'is-invalid' }
            : { isInvalid: false })}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className="invalid-feedback">{meta.error}</div>
        ) : null}
      </Form.Group>
    </>
  );
};

const NewOptionGroupForm = ({ addOptionGroup }) => {
  const { t } = useTranslation();

  const AddCheckSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, t('warningShort'))
      .max(999, t('warningLong'))
      .required(t('warningRequired')),
  });

  const optionGroups = useSelector((state) => state.optionGroups);

  /*
  const handleDifferentialChoose = (event) => {
    event.preventDefault();
    console.log(selectedOption);
    const optionGroup = optionGroups.filter((d) => d.name === selectedOption[0])[0];
    addOptionGroup(optionGroup.id);
    setSelectedOption([]);
    */

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
