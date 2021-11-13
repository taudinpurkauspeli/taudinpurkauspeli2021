import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams,
} from 'react-router-dom';
import { Button, Form, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import HideCase from './HideCase';
import Differential from '../differential/Differential';
import service from '../../services/cases';

const Anamnesis = ({ c, admin, updateCaseFunc }) => {
  const [title, setTitle] = useState(c.title);
  const [alertMessage, setAlertMessage] = useState(null);
  const { t } = useTranslation();

  const caseSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, t('warningShort'))
      .max(999, t('warningLong'))
      .required(t('warningRequired')),
  });

  const handleTitleUpdate = (values) => {
    const updatedCase = ({
      title: values.title,
      anamnesis: c.anamnesis,
      hidden: c.hidden,
    });

    if (updateCaseFunc !== undefined) {
      updateCaseFunc(updatedCase);
    } else {
      service.update(c.id, updatedCase);
      setTitle(values.title);
      setAlertMessage(t('caseUpdateSuccess'));
      setTimeout(() => {
        setAlertMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      { alertMessage !== null && (
        <Alert variant="success">{alertMessage}</Alert>
      )}
      <p>Casen tiedot löytyvät täältä</p>
      { admin && (
        <div>
          <Formik
            initialValues={{
              title,
            }}
            validationSchema={caseSchema}
            onSubmit={handleTitleUpdate}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="updateTitle">
                  <Form.Control
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    isInvalid={!!errors.title}
                  />
                  <Form.Text className="text-muted">
                    {t('caseTitleInstruction')}
                  </Form.Text>
                  <Form.Control.Feedback type="invalid" role="alert" aria-label="from feedback">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form>
            )}
          </Formik>
          <HideCase caseToBeHidden={c} />
        </div>
      )}
      { !admin && (
        <p>{c.title}</p>
      )}
      <p>{c.anamnesis}</p>
    </div>
  );
};

const Procedures = () => (
  <div>
    <p>Toimenpiteet löytyvät täältä</p>
  </div>
);

const Case = ({ cases, admin, updateCaseFunc }) => {
  const { id } = useParams();
  const c = cases.find((a) => a.id === Number(id));
  const baseUrl = `/cases/${id}`;
  const { t } = useTranslation();

  return (
    <Router>
      <div id="wrapper">
        <Button as={Link} to={baseUrl}>{t('caseAnamnesis')}</Button>
        <Button as={Link} to={`${baseUrl}/procedures`}>{t('caseProcedures')}</Button>
        <Button as={Link} to={`${baseUrl}/differentials`}>{t('caseDifferentials')}</Button>

        <Switch>
          <Route path={`${baseUrl}/procedures`}>
            <Procedures />
          </Route>
          <Route path={`${baseUrl}/differentials`}>
            <Differential admin={admin} caseId={c.id} />
          </Route>
          <Route path={baseUrl}>
            <Anamnesis c={c} admin={admin} updateCaseFunc={updateCaseFunc} />
          </Route>
        </Switch>

      </div>

    </Router>
  );
};

export default Case;
