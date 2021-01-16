import React, { useState, useEffect } from 'react';
import format from 'date-fns/format';
import { makeStyles } from '@material-ui/core/styles';
import Material from '../../../shared/material';
import TableRowMenu from '../tableRowMenu/TableRowMenu';
import LoadingTableRow from '../loadingTableRow/LoadingTableRow';

const useStyles = makeStyles((theme) => ({
  tableCellActions: {
    visibility: 'hidden',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  tableRow: {
    '&:hover': {
      '& $tableCellActions': {
        visibility: 'visible',
      },
    },
  },
  tableCell: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    height: '50px',
  },
  tableCellEdit: {
    padding: 0,
  },
  tableTotalRow: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
}));

export default function DataTableRow(props) {
  const classes = useStyles();
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

        if (column.id === 'type') {
          if (column.items[value]) {
            tableCellData = column.items[value].label;
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
