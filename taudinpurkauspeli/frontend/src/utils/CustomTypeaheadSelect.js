import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';

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

export default CustomTypeaheadSelect;
