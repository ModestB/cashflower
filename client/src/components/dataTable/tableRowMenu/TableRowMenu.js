import React from 'react';
import PropTypes from 'prop-types';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Material from '../../../shared/material';

const ITEM_HEIGHT = 48;

function TableRowMenu({
  id,
  showEditHandler,
  deleteHandler,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = [
    {
      label: 'Edit',
      handler: () => {
        showEditHandler();
        handleClose();
      },
    },
    {
      label: 'Delete',
      handler: () => {
        deleteHandler(id);
        handleClose();
      },
    },
  ];

  return (
    <>
      <Material.IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Material.IconButton>
      <Material.Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <Material.MenuItem key={option.label} onClick={option.handler}>
            {option.label}
          </Material.MenuItem>
        ))}
      </Material.Menu>
    </>
  );
}

TableRowMenu.propTypes = {
  id: PropTypes.string.isRequired,
  showEditHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

export default TableRowMenu;
