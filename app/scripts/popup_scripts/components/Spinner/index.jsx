import MDSpinner from 'react-md-spinner';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * @param {object} props
 * @param {string} props.color
 */
export function Spinner({ color }) {
  return <MDSpinner singleColor={color} size={18} />;
}

Spinner.propTypes = {
  color: PropTypes.string,
};
