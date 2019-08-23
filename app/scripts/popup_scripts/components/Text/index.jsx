/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import PropTypes from 'prop-types';

const styles = css`
  font-size: 13px;
  line-height: 1.4;
  margin: 0;

  color: #4f4f4f;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;

  &:not(:last-of-type) {
    margin-bottom: 1em;
  }
`;

/**
 * @param {React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>} props
 */
export function Text({ children, ...props }) {
  return (
    <p css={styles} {...props}>
      {children}
    </p>
  );
}

Text.propTypes = {
  children: PropTypes.node,
};
