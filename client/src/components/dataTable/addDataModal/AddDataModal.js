import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TableSettingsContext } from '../../../context/TableSettingsContext';
import DateInput from '../inputs/dateInput/DateInput';
import NumberInput from '../inputs/numberInput/NumberInput';
import SelectInput from '../inputs/selectInput/SelectInput';
import TextInput from '../inputs/textInput/TextInput';
import Modal from '../../modal/Modal';
import FormControl from '../inputs/formControl/FormControl';

function AddDataModal({
  openModalHandler,
  openModal,
  dataValues,
  dataChangeHandlers,
  selectOptions,
  addTypeHandler,
  deleteTypeHandler,
  selectAddLoading,
  selectDeleteLoading,
  addDataHandler,
}) {
  const { tableSettings } = useContext(TableSettingsContext);

  return (
    <Modal
      openModalHandler={openModalHandler}
      openModal={openModal}
      addDataHandler={addDataHandler}
    >
      {Object.values(tableSettings)
        .map((column) => {
          let input = null;

          switch (column.inputType) {
            case 'date':
              input = (
                <DateInput
                  label={column.label}
                  selectedDate={dataValues[column.id]}
                  onChangeHandler={dataChangeHandlers[column.id]}
                  dateFormat={column.dateFormat}
                />
              );
              break;
            case 'number':
              if (column.editable) {
                input = (
                  <NumberInput
                    label={column.label}
                    value={dataValues[column.id]}
                    onChangeHandler={dataChangeHandlers[column.id]}
                  />
                );
              }
              break;
            case 'select':
              input = (
                <SelectInput
                  label={column.label}
                  value={dataValues[column.id]}
                  selectType={column.selectType}
                  onChangeHandler={dataChangeHandlers[column.id]}
                  options={selectOptions[column.id]}
                  addHandler={addTypeHandler}
                  deleteHandler={deleteTypeHandler}
                  selectAddLoading={selectAddLoading}
                  selectDeleteLoading={selectDeleteLoading}
                />
              );
              break;
            case 'textArea':
              input = (
                <TextInput
                  label={column.label}
                  value={dataValues[column.id]}
                  onChangeHandler={dataChangeHandlers[column.id]}
                />
              );
              break;

            default:
              break;
          }

          if (!input) return null;

          return (
            <FormControl key={`addDataModal${column.id}`}>
              {input}
            </FormControl>
          );
        })}
    </Modal>
  );
}

AddDataModal.propTypes = {
  openModalHandler: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
  dataValues: PropTypes.oneOfType([PropTypes.object]).isRequired,
  dataChangeHandlers: PropTypes.oneOfType([PropTypes.object]).isRequired,
  selectOptions: PropTypes.oneOfType([PropTypes.object]).isRequired,
  addTypeHandler: PropTypes.func.isRequired,
  deleteTypeHandler: PropTypes.func.isRequired,
  selectAddLoading: PropTypes.bool.isRequired,
  selectDeleteLoading: PropTypes.bool.isRequired,
  addDataHandler: PropTypes.func.isRequired,
};

export default AddDataModal;
