import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useParams, useHistory,
} from 'react-router-dom';
import service from '../services/cases';

const EditCase = ({ cases, editCaseFunc }) => {
  const { id } = useParams();
  const c = cases.find((a) => a.id === Number(id));
  const [newHidden, setNewHidden] = useState(c.hidden);
  // const baseUrl = `/editcase/${id}`;
  const { t } = useTranslation();
  const history = useHistory();

  const editCase = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-param-reassign
    const caseObject = ({
      title: c.title,
      anamnesis: c.anamnesis,
      hidden: newHidden,
    });

    if (editCaseFunc != null) {
      editCaseFunc(caseObject);
    }
    service.update(id, caseObject);
    if (editCaseFunc == null) {
      history.push('/');
    }
  };

  const handleHiddenChange = () => {
    setNewHidden(!newHidden);
  };

  return (
    <div id="wrapper">
      <h2>{t('addCase')}</h2>

      <form onSubmit={editCase}>
        <p>
          <label htmlFor="title">
            {t('caseTitle')}
          </label>
          <br />
          <input
            id="title"
            type="text"
            value={c.title}
          />
        </p>
        <p>
          <label htmlFor="anamnesis">{t('caseAnamnesis')}</label>
          <br />
          <textarea
            id="anamnesis"
            type="textarea"
            value={c.anamnesis}
          />
        </p>
        <p>
          <label htmlFor="hidden">{t('hideCase')}</label>
          <br />
          <input
            id="hidden"
            checked={newHidden}
            type="checkbox"
            onClick={handleHiddenChange}
          />
        </p>
        <p>
          <input type="submit" id="submit" value={t('buttonEdit')} />
        </p>
      </form>
    </div>
  );
};

export default EditCase;
