import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import service from '../../services/cases';

const newCase = ({ addCaseFunc }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const newCaseSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, t('warningShort'))
      .max(999, t('warningLong'))
      .required(t('warningRequired')),
    anamnesis: Yup.string(),
    hidden: Yup.bool(),
  });

  const addCase = (values) => {
    const caseObject = ({
      title: values.title,
      anamnesis: values.anamnesis,
      hidden: values.hidden,
    });

    if (addCaseFunc !== undefined) {
      addCaseFunc(caseObject);
    } else {
      service.create(caseObject);
      history.push('/');
    }
  };

  return (
    <div id="wrapper">
      <h2>{t('addCase')}</h2>

      <Formik
        initialValues={{
          title: '',
          anamnesis: '',
          hidden: false,
        }}
        validationSchema={newCaseSchema}
        onSubmit={addCase}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group md="6" controlId="title">
              <Form.Label>{t('caseTitle')}</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="anamnesis">
              <Form.Label>{t('caseAnamnesis')}</Form.Label>
              <Form.Control
                as="textarea"
                name="anamnesis"
                rows={3}
                value={values.anamnesis}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="hidden">
              <Form.Check
                required
                name="hidden"
                label={t('hideCase')}
                value={values.hidden}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit">{t('buttonSubmitNewCase')}</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default newCase;
