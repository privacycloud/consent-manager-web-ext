/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import PropTypes from 'prop-types';

const style = css`
  margin: 0;

  color: #303234;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
`;

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 */
export function Title({ children }) {
  return <h1 css={style}>{children}</h1>;
}

Title.propTypes = {
  children: PropTypes.node,
};
