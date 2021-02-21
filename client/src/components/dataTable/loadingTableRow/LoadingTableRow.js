import React from 'react';
import PropTypes from 'prop-types';
import Material from '../../../shared/material';
import LinearProgress from '../../progress/linearProgress/LinearProgress';

function LoadingTableRow({
  type,
  colSpan,
}) {
  return (
    <Material.TableRow>
      <Material.TableCell colSpan={colSpan}>
        <LinearProgress type={type} />
      </Material.TableCell>
    </Material.TableRow>
  );
}

LoadingTableRow.propTypes = {
  type: PropTypes.string,
  colSpan: PropTypes.number.isRequired,
};

LoadingTableRow.defaultProps = {
  type: '',
};

export default LoadingTableRow;
