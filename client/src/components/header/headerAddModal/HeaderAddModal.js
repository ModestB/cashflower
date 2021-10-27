import React from 'react';
import { useLocation } from 'react-router-dom';
import AddTransaction from '../../modal/addTransaction/AddTransaction';

function HeaderAddModal({
  openModalHandler,
  openModal,
}) {
  const location = useLocation();
  let modal = null;
  switch (location.pathname) {
    case '/':
      modal = (
        <AddTransaction openModalHandler={openModalHandler} openModal={openModal} />
      );
      break;

    default:
      break;
  }
  return modal;
}

export default HeaderAddModal;
