import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import format from 'date-fns/format';
import Material from '../../../../shared/material';
import incomeTableRowStyles from './incomeTableRowStyles';
import TableRowMenu from '../../../../components/dataTable/tableRowMenu/TableRowMenu';
import LoadingTableRow from '../../../../components/dataTable/loadingTableRow/LoadingTableRow';

export default function IncomeTableRow(props) {
  const classes = incomeTableRowStyles();
  const incomeTypes = useSelector(state => state.income.types);
  const [columns, setColumns] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const colSpan = Object.keys(props.columnsSettings).length;
  let rowContent = null;

  useEffect(() => {
    setIsDeleting(false);
  }, [props.row]);

  useEffect(() => {
    const col = Object.keys(props.columnsSettings)
      .map(key => props.columnsSettings[key]);
    setColumns(col);
  }, [props.columnsSettings]);

  const showEditDataHandler = () => {
    setShowEdit(true);
  };

  const cancelHandler = () => {
    setShowEdit(false);
  };

  const deleteHandler = () => {
    setIsDeleting(true);

    props.deleteHandler(props.row.id);
  };

  if (!showEdit) {
    rowContent =
      columns.map((column) => {
        const value = props.row[column.id];
        let tableCellData =
          column.format && typeof value === 'number' ?
            column.format(value)
            : value;

        if (column.id === 'type' && Object.keys(incomeTypes).length) {
          if (incomeTypes[value]) {
            tableCellData = incomeTypes[value].label;
          } else {
            tableCellData = '';
          }
        }

        if (column.id === 'edit') {
          tableCellData = (
            <div className={classes.tableCellActions}>
              <TableRowMenu
                id={props.row.id}
                deleteHandler={deleteHandler}
                showEditHandler={showEditDataHandler}
              />
            </div>
          );
        }

        if (column.inputType === 'date') {
          tableCellData = format(new Date(value), column.dateFormat);
        }

        if (column.countableTotal) {
          tableCellData =
            columns
              .filter((col) => col.countable)
              .reduce((acc, cur) => acc + props.row[cur.id], 0);
        }

        return (
          <Material.TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
            className={classes.tableCell}
          >
            {tableCellData}
          </Material.TableCell>
        );
      });
  } else {
    rowContent = (
      <Material.TableCell
        className={classes.tableCellEdit}
        colSpan={colSpan}
      >
        {React.cloneElement(
          props.children,
          { cancelHandler },
        )}
      </Material.TableCell>
    );
  }

  let row = (
    <Material.TableRow
      className={[
        classes.tableRow,
        props.tableOptions && props.tableOptions.totalSummary ? classes.tableTotalRow
          : '',
      ].join(' ')}
      hover
      role="checkbox"
      tabIndex={-1}
      key={props.row ? props.row.code : 1}
    >
      {rowContent}
    </Material.TableRow>
  );

  if (isDeleting) {
    row = <LoadingTableRow colSpan={colSpan} type="danger" />;
  }

  return row;
}
