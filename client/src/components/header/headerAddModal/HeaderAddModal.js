import React from 'react';
import { useLocation } from 'react-router-dom';
import AddEditTransaction from '../../../domain/transactions/addEditTransaction/AddEditTransaction';

function HeaderAddModal({
  openModalHandler,
  openModal,
}) {
  const location = useLocation();
  let modal = null;
  switch (location.pathname) {
    case '/':
      modal = (
        <AddEditTransaction openModalHandler={openModalHandler} openModal={openModal} />
      );
      break;

    default:
      break;
  }
  return modal;
}

export default HeaderAddModal;
