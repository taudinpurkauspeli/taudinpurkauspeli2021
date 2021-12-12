import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line no-unused-vars
const UpdateTextSubProcedure = ({ id, title, text }) => {
  const { t } = useTranslation();
  const [test, setTest] = useState(false);
  console.log(test);

  return (
    <div>
      <Button className="editButton" size="sm" onClick={() => setTest(!test)}>{t('buttonEdit')}</Button>
    </div>
  );
};

export default UpdateTextSubProcedure;
