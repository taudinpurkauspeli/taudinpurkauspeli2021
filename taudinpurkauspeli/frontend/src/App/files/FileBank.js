import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Table, Button } from 'react-bootstrap';
import { getProcedures } from '../procedure/reducers/proceduresReducer';
import { getDifferentials } from '../differential/reducers/differentialsReducer';
import { getDifferentialGroups } from '../differential/reducers/differentialGroupsReducer';
import { getOptionGroups } from '../subprocedure/reducers/optionGroupsReducer';
import { getOptions } from '../subprocedure/reducers/optionReducer';

const FileBank = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let content;

  useEffect(() => {
    dispatch(getProcedures());
    dispatch(getOptionGroups());
    dispatch(getOptions());
    dispatch(getDifferentials());
    dispatch(getDifferentialGroups());
  }, []);

  const handleDelete = (id) => {
    // eslint-disable-next-line no-alert
    const confirmBox = window.confirm(t('deleteEntityConfirmation'));
    if (confirmBox === true) {
      dispatch(
        remove(
          id,
          t('deleteSuccess'),
          t('deleteError'),
        ),
      );
    }
  };

  // sarake, jossa kerrottu, monessako casessa käytetään
  // työaikaa +0,75h

  return (
    <div id="wrapper">
      <h2>{t('fileBank')}</h2>
      <Dropdown size="lg">
        <Dropdown.Toggle>
          {t('chooseBank')}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as="button" onClick={() => { content = useSelector((state) => state.differentials); }}>
            {t('differentials')}
          </Dropdown.Item>
          <Dropdown.Item>
            {t('procedures')}
          </Dropdown.Item>
          <Dropdown.Item>
            {t('files')}
          </Dropdown.Item>
          <Dropdown.Item>
            {t('differentialGroups')}
          </Dropdown.Item>
          <Dropdown.Item>
            {t('subProcedures')}
          </Dropdown.Item>
          <Dropdown.Item>
            {t('options')}
          </Dropdown.Item>
          <Dropdown.Item>
            {t('optionGroups')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{t('title')}</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {content.map((c) => (
            <tr key={c.id}>
              <td>{c.title}</td>
              <td>
                <Button>{t('edit')}</Button>
                <Button onClick={handleDelete(c.id)}>{t('delete')}</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FileBank;
