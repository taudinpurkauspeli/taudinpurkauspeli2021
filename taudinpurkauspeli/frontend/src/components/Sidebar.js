import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <div id="sidebar">
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {t('button_selectCase')}
        </Dropdown.Toggle>

        <Dropdown.Menu variant="#a9c9ae">
          <Dropdown.Item href="#/action-1">Case 1</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Case 2</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Case 3</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Sidebar;
