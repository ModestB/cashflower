import { makeStyles } from '@material-ui/core/styles';

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

export default useStyles;
