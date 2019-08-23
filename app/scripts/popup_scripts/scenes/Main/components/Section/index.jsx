/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import PropTypes from 'prop-types';

const container = css`
  margin: 35px 0;
`;

/**
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 */
export function Section({ children }) {
  return <section css={container}>{children}</section>;
}

Section.propTypes = {
  children: PropTypes.node,
};
