/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import service from '../services/cases';

const AddCase = () => {
  const { t } = useTranslation();
  const [cases, setCases] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newAnamnesis, setNewAnamnesis] = useState('');
  const [newHidden, setNewHidden] = useState(false);

  useEffect(() => {
    service
      .getAll()
      .then((initialCases) => {
        setCases(initialCases);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
  }, []);

  const addCase = (event) => {
    event.preventDefault();
    const caseObject = {
      title: newTitle,
      anamnesis: newAnamnesis,
      hidden: newHidden,
    };

    service.create(caseObject)
      .then((createdCase) => {
        setCases(cases.concat(createdCase));
        setNewTitle('');
        setNewAnamnesis('');
        setNewHidden(false);
      });
  };

  return (
    <div id="wrapper">
      <h2>{t('cases')}</h2>
      <ul>
        {cases.map((case1) => (
          <li key={case1.id}>
            {case1.title}
          </li>
        ))}
      </ul>

      <form onSubmit={addCase}>
        <p>
          <label htmlFor="title">Casen otsikko:</label>
          <br />
          <input
            id="title"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
          />
        </p>
        <p>
          <label htmlFor="anamnesis">Anamneesi:</label>
          <br />
          <textarea
            id="anamnesis"
            value={newAnamnesis}
            onChange={(event) => setNewAnamnesis(event.target.value)}
          />
        </p>
        <p>
          <label htmlFor="hidden">Piilota käyttäjiltä:</label>
          <br />
          <input
            id="hidden"
            value={newHidden}
            type="checkbox"
            onClick={() => setNewHidden(true)}
          />
        </p>
        <p>
          <input type="submit" value="Lähetä" />
        </p>
      </form>

    </div>
  );
};

export default AddCase;
