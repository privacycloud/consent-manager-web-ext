/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';

const style = css`
  font-size: 13px;
  margin: 0;

  color: #4f4f4f;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
`;

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
