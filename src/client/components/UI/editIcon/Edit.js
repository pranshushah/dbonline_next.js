import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

function EditIcon({ size }) {
  return <FontAwesomeIcon icon={faPencilAlt} size={size ? size : 'xs'} />;
}

export default EditIcon;
