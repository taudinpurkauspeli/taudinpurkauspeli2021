import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import HideCase from '../case/components/HideCase';
import UpdateCaseTitle from '../case/components/UpdateCaseTitle';
import UpdateAnamnesis from './UpdateAnamnesis';
import { updateCase } from '../case/casesReducer';

const Anamnesis = ({ admin }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const c = useSelector((state) => state.cases.find((a) => a.id === Number(id)));

  /* istanbul ignore next */
  const handleCaseUpdate = (updatedCase) => {
    dispatch(updateCase(updatedCase, t('caseUpdateSuccess'), t('caseUpdateError')));
  };

  return (
    <div>
      {admin && c && (
        <div id="casePageArea">
          <div className="rows">
            <UpdateCaseTitle c={c} updateCaseTitle={handleCaseUpdate} />
            <HideCase c={c} hideCase={handleCaseUpdate} />
          </div>
          <UpdateAnamnesis c={c} updateAnamnesis={handleCaseUpdate} />
        </div>
      )}
      {!admin && c && (
        <p>{c.title}</p>
      )}
    </div>
  );
};

export default Anamnesis;
