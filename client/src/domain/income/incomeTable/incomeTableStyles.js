import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.grey[50],
  },
  container: {
    maxHeight: 'calc(100% - 152px)',
    // overflowX: 'hidden',
  },
  table: {
    tableLayout: 'fixed',
    width: '100%',
  },
  tableHead: {
    padding: theme.spacing(2),
  },
  tablePagination: {
    marginTop: 'auto',
    minHeight: '50px',
    overflow: 'hidden',
  },
  formControl: {
    minWidth: 170,
  },
  yearsFormControl: {
    minWidth: 90,
  },
  customScroll: theme.mixins.customScrollBar,
  tableCellActions: {
    visibility: 'hidden',
  },
  tableRow: {
    '&:hover': {
      '& $tableCellActions': {
        visibility: 'visible',
      },
    },
  },
}));

export default useStyles;
