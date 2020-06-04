/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';

const style = css`
  margin: 0;

  color: #303234;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
`;

export function Title({ children }) {
  return <h1 css={style}>{children}</h1>;
}

Title.propTypes = {
  children: PropTypes.node,
};
