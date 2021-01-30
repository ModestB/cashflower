import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Material from '../../shared/material';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  containerTable: {
    height: 'calc(100vh - 88px)',
  },
  containerGraph: {
    height: 'calc(100vh - 104px)',
    margin: `-${theme.spacing(2)}px 0`,
  },
}));

const TableChartGrid = ({ hasData, children }) => {
  const classes = useStyles();
  const hasGraph = !React.isValidElement(children);

  return (
    <div className={classes.root}>
      <Material.Grid container spacing={2}>
        <Material.Grid
          item
          xs={hasGraph ? 8 : 12}
          className={classes.containerTable}
        >
          {
            hasGraph ?
              children[0]
              : children
          }
        </Material.Grid>
        {
          hasData && hasGraph &&
          (
            <Material.Grid item xs={4} className={classes.containerGraph}>
              {children[1]}
            </Material.Grid>
          )
        }
      </Material.Grid>
    </div>
  );
};

TableChartGrid.defaultProps = {
  hasData: false,
};

TableChartGrid.propTypes = {
  children: PropTypes.node.isRequired,
  hasData: PropTypes.bool,
};

export default TableChartGrid;
