import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function DeleteIcon({ size }) {
  return <FontAwesomeIcon icon={faTrash} size={size ? size : 'xs'} />;
}

export default DeleteIcon;
