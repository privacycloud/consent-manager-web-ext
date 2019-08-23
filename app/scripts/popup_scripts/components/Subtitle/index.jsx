/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import PropTypes from 'prop-types';

const style = css`
  font-size: 13px;
  margin: 0;

  color: #4f4f4f;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
`;

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 */
export function Subtitle({ children, ...props }) {
  return (
    <p css={style} {...props}>
      {children}
    </p>
  );
}

Subtitle.propTypes = {
  children: PropTypes.node,
};
