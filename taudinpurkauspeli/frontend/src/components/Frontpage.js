/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Row,
} from 'react-bootstrap';

import service from '../services/cases';
import CaseCard from './CaseCard';

const Frontpage = () => {
  const { t } = useTranslation();
  const [cases, setCases] = useState([]);

  useEffect(() => {
    service
      .getAll()
      .then((initialCases) => {
        const filtered = initialCases.filter((c) => !c.hidden);
        setCases(filtered);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
  }, []);

  return (
    <div id="wrapper">
      <h2>{t('frontpage_title')}</h2>
      <p>{t('frontpage_text')}</p>
      <Row xs="auto" md="auto" className="g-4">
        {cases.map((c) => (
          <Col key={c.id}>
            <CaseCard title={c.title} description={c.anamnesis} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default Frontpage;
