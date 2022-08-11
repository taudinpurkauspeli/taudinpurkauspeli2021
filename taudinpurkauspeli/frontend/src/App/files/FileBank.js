import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Table, Button } from 'react-bootstrap';
import { getProcedures, removeProcedure, updateProcedure } from '../procedure/reducers/proceduresReducer';
import { getDifferentials, removeDifferential, updateDifferential } from '../differential/reducers/differentialsReducer';
import { getDifferentialGroups, removeDifferentialGroup, updateDifferentialGroup } from '../differential/reducers/differentialGroupsReducer';
import { getOptionGroups, removeOptionGroup, updateOptionGroup } from '../subprocedure/reducers/optionGroupsReducer';
import { getOptions, removeOption, updateOption } from '../subprocedure/reducers/optionReducer';
import { getSubProcedures, removeSubProcedure, updateSubprocedure } from '../subprocedure/reducers/subProceduresReducer';
import AddUpdateModal from '../../utils/AddUpdateModal';
import UpdateNameForm from './UpdateNameForm';

const FileBank = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [content, setContent] = useState([]);
  const [category, setCategory] = useState('');
  const [dropdownTitle, setDropdownTitle] = useState(t('chooseBank'));
  const modalRef = useRef();

  useEffect(() => {
    dispatch(getOptionGroups());
    dispatch(getProcedures());
    dispatch(getSubProcedures());
    dispatch(getDifferentials());
    dispatch(getOptions());
    dispatch(getDifferentialGroups());
  }, []);

  const differentials = useSelector((state) => state.differentials);
  const differentialGroups = useSelector((state) => state.differentialGroups);
  const procedures = useSelector((state) => state.procedures);
  const subProcedures = useSelector((state) => state.subProcedures);
  const options = useSelector((state) => state.options);
  const optionGroups = useSelector((state) => state.optionGroups);

  const selectBank = (dropDownContent, event) => {
    setCategory(event.target.value);
    setContent(dropDownContent);
    setDropdownTitle(event.target.textContent);
  };

  const handleDelete = (id) => {
    // eslint-disable-next-line no-alert
    const confirmBox = window.confirm(t(`delete${category}Confirmation`));
    if (confirmBox === true) {
      switch (category) {
        case 'File':
          break;
        case 'Differential':
          dispatch(removeDifferential(id, t('differentialRemoveSuccess'), t('differentialRemoveError')));
          break;
        case 'DifferentialGroup':
          dispatch(removeDifferentialGroup(id, t('differentialGroupRemoveSuccess'), t('differentialGroupRemoveError')));
          break;
        case 'Procedure':
          dispatch(removeProcedure(id, t('procedureRemoveSuccess'), t('procedureRemoveError')));
          break;
        case 'SubProcedure':
          dispatch(removeSubProcedure(id, t('subProcedureRemoveSuccess'), t('subProcedureRemoveError')));
          break;
        case 'Option':
          dispatch(removeOption(id, t('optionRemoveSuccess'), t('optionRemoveError')));
          break;
        case 'OptionGroup':
          dispatch(removeOptionGroup(id, t('optionGroupRemoveSuccess'), t('optionGroupRemoveError')));
          break;
        default:
          break;
      }
    }
  };

  const handleUpdate = (entity) => {
    // eslint-disable-next-line no-alert
    const confirmBox = window.confirm(t(`update${category}Confirmation`));
    if (confirmBox === true) {
      modalRef.current.toggleVisibility();
      switch (category) {
        case 'File':
          break;
        case 'Differential':
          dispatch(updateDifferential(entity, t('differentialUpdateSuccess'), t('differentialUpdateError')));
          break;
        case 'DifferentialGroup':
          dispatch(updateDifferentialGroup(entity, t('differentialGroupUpdateSuccess'), t('differentialGroupUpdateError')));
          break;
        case 'Procedure':
          dispatch(updateProcedure(entity, t('procedureUpdateSuccess'), t('procedureUpdateError')));
          break;
        case 'SubProcedure':
          dispatch(updateSubprocedure(entity, t('subProcedureUpdateSuccess'), t('subProcedureUpdateError')));
          break;
        case 'Option':
          dispatch(updateOption(entity, t('optionUpdateSuccess'), t('optionUpdateError')));
          break;
        case 'OptionGroup':
          dispatch(updateOptionGroup(entity, t('optionGroupUpdateSuccess'), t('optionGroupUpdateError')));
          break;
        default:
          break;
      }
    }
  };

  // sarake, jossa kerrottu, monessako casessa käytetään
  // työaikaa +0,75h +0,5h +0,5h + 0,5h +0,75h +0,75h +1,5h +1h +1,5h

  return (
    <div id="wrapper">
      <h2>{t('fileBank')}</h2>
      <Dropdown size="lg">
        <Dropdown.Toggle variant="success" style={{ margin: '10px 0' }}>
          {dropdownTitle}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item value="File">
            {t('files')}
          </Dropdown.Item>
          <Dropdown.Item value="Differential" as="button" onClick={(e) => { selectBank(differentials, e); }}>
            {t('differentials')}
          </Dropdown.Item>
          <Dropdown.Item value="DifferentialGroup" as="button" onClick={(e) => { selectBank(differentialGroups, e); }}>
            {t('differentialGroups')}
          </Dropdown.Item>
          <Dropdown.Item value="Procedure" as="button" onClick={(e) => { selectBank(procedures, e); }}>
            {t('procedures')}
          </Dropdown.Item>
          <Dropdown.Item value="SubProcedure" as="button" onClick={(e) => { selectBank(subProcedures, e); }}>
            {t('subProcedures')}
          </Dropdown.Item>
          <Dropdown.Item value="Option" as="button" onClick={(e) => { selectBank(options, e); }}>
            {t('options')}
          </Dropdown.Item>
          <Dropdown.Item value="OptionGroup" as="button" onClick={(e) => { selectBank(optionGroups, e); }}>
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
              <td>{c.name}</td>
              <td className="cardButtons">
                <AddUpdateModal buttonLabel={t('edit')} titleLabel={t('edit')} ref={modalRef}>
                  <UpdateNameForm entity={c} updateEntity={handleUpdate} />
                </AddUpdateModal>
                <Button className="removeButton" size="sm" variant="danger" onClick={() => handleDelete(c.id)}>{t('buttonRemove')}</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FileBank;
